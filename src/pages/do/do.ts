import { UserService } from '../../providers/user-service';
import { Component, OnInit } from "@angular/core"
import { NavController, AlertController, ModalController, ViewController, NavParams } from 'ionic-angular';

import { ZoneModel } from '../../models/zone.model';
import { DistributorModel } from '../../models/distributor.model';
import { BrandModel } from '../../models/brand.model';
import { ProductModel } from '../../models/product.model';

import { DOService } from '../../providers/do-service';
import { HelperService } from '../../providers/helper-service';

import * as _ from 'lodash';

@Component({
  templateUrl: 'do.html',
})
export class DoPage implements OnInit {


  do: {
    zoneId?: number, distributorId?: number, paymentMode?: number, creditDays?: number,
    remarks?: string, salesPersonId?: number, creatorUserId?: number, salesRequisitionDate?: Date,
    salesRequisitionItems?: any[]
  } = {};
  selectProducts: any[] = [];
  productTypeId: number;
  submitted = false;
  zones: ZoneModel[];
  distributors: DistributorModel[];
  brands: BrandModel[];
  brandId: number;
  isFinishProductSelected = false;

  constructor(private nav: NavController, private modalCtrl: ModalController, private doService: DOService,
    private helper: HelperService, private userService: UserService) {

  }

  ngOnInit() {
    this.loadZones();
    this.loadBrands();
  }

  loadZones() {
    this.doService.getAllZones().subscribe(
      res => {
        if (res.success && !res.unAuthorizedRequest) {
          this.zones = res.result.zones;
          console.log(this.zones);
        }
        else {
          this.helper.showAlert(res.error.message, res.error.details);
        }

      },
      error => { }
    );

  }
  openModal() {
    if (this.productTypeId == null) {
      this.helper.showAlert("Select Product type", "You must select product type before add product.");
      return false;
    } else if (this.productTypeId == 1) {
      if (this.brandId == null) {
        this.helper.showAlert("Select Brand", "You must select brand before add product.");
        return false;
      }
    }
    let param = {
      productType: this.productTypeId,
      brandId: this.brandId
    };
    let modal = this.modalCtrl.create(AddProductModalPage, param);
    modal.present(modal);
    // Getting data from the modal:

    modal.onDidDismiss(data => {
      if (data) {
        this.selectProducts.push(data);
      }
      //console.log('MODAL DATA', this.selectProducts);
    });
  }

  zoneChanged($event: any, zoneId) {
    this.doService.getAllZoneDistributors(this.do.zoneId).subscribe(
      res => {
        if (res.success && !res.unAuthorizedRequest) {
          this.distributors = res.result.distributors;
        }
        else {
          this.helper.showAlert(res.error.message, res.error.details);
        }

      },
      error => { }
    );
    //console.log(this.do.zoneId);
  }

  paymentModeChanged($event: any, paymentModeId) {
    if (this.do.paymentMode == 0) {
      this.do.creditDays = 0;
    }
  }

  loadBrands() {
    this.doService.getAllBrands().subscribe(
      res => {
        if (res.success && !res.unAuthorizedRequest) {
          this.brands = res.result.brands;
        }
        else {
          this.helper.showAlert(res.error.message, res.error.details);
        }

      },
      error => { }
    );
  }

  deleteItem(val) {
    _.remove(this.selectProducts, {
      productId: val
    });
  }

  productTypeChanged() {
    if (this.productTypeId == 1) {
      this.isFinishProductSelected = true;
    }else{
       this.isFinishProductSelected = false;
    }
  }
  private isValid() {
    let isValid: boolean = true;
    if (this.do.distributorId == null) {
      this.helper.showAlert("Please select a distributor.", "Distributor Require.");
      isValid = false;
    } else if (this.do.paymentMode == null) {
      this.helper.showAlert("Please select a payment Type.", "Payment Type Require.");
      isValid = false;
    } else if (this.selectProducts.length == 0) {
      this.helper.showAlert("Please add at least one product.", "Product Require.");
      isValid = false;
    } else if (this.do.creditDays == null) {
      this.helper.showAlert("Please provide a credit days.", "Credit Days Require.");
      isValid = false;
    } else if (this.do.paymentMode == 1 && this.do.creditDays == 0) {
      this.helper.showAlert("Credit days cannot be 0 for payment mode credit.", "Credit Days mismatch.");
      isValid = false;
    } else if (this.do.paymentMode == 0 && this.do.creditDays > 0) {
      this.helper.showAlert("Credit days should be 0 for payment mode cash.", "Credit Days mismatch.");
      isValid = false;
    }

    return isValid;
  }
  saveRequisition() {
    if (!this.isValid()) {
      return false;
    }
    this.userService.getUserId().then((value) => {
      this.do.salesPersonId = Number(value);
      this.do.creatorUserId = Number(value);
      this.do.salesRequisitionDate = new Date();

      this.do.salesRequisitionItems = this.selectProducts;

      this.doService.createSalesRequisition(this.do).subscribe(
        res => {
          if (res.success && !res.unAuthorizedRequest) {
            this.helper.showAlert("New Sales requisition created successfully", "Saved");
          }
          else {
            this.helper.showAlert(res.error.message, res.error.details);
          }

        },
        error => { }
      );

    });

  }
}


@Component({
  templateUrl: 'add-product-modal.html'
})
export class AddProductModalPage {
  //character;
  products: ProductModel[];
  selectProduct: {
    salesRequisitionId?: number, productType?: number, brandId?: number, productId?: number,
    fullProductName?: string, quantity?: number, unitPrice?: number, price?: number,
    isFree?: boolean, itemWiseRemarks?: string
  } = {};

  constructor(private viewCtrl: ViewController, private alertCtrl: AlertController, private params: NavParams,
    private doService: DOService, private helper: HelperService) {

  }

  ngOnInit() {
    let productType = this.params.get('productType');
    if (productType == 0) {
      this.loadRawMaterials();
    } else if (productType == 1) {
      this.loadFinishProducts();
    } else if (productType == 2) {
      this.loadPackagingProducts()
    } else if (productType == 3) {
      this.loadOtherProducts();
    }
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Product Added!',
      subTitle: 'Your Requisition Product Added Successfully.',
      buttons: ['OK']
    });
    alert.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  addProduct() {
    this.showAlert();
    this.viewCtrl.dismiss(this.selectProduct);
  }

  loadFinishProducts() {
    let brandId = this.params.get('brandId');
    this.doService.getFinishProducts(brandId).subscribe(
      res => {
        if (res.success && !res.unAuthorizedRequest) {
          this.products = res.result.finishProducts;

        }
        else {
          this.helper.showAlert(res.error.message, res.error.details);
        }
      },
      error => { }
    );
  }

  loadRawMaterials() {
    this.doService.getRawMaterials().subscribe(
      res => {
        if (res.success && !res.unAuthorizedRequest) {
          this.products = res.result.rawMaterials;
        }
        else {
          this.helper.showAlert(res.error.message, res.error.details);
        }
      },
      error => { }
    );
  }

  loadPackagingProducts() {
    this.doService.getPackagingProducts().subscribe(
      res => {
        if (res.success && !res.unAuthorizedRequest) {
          this.products = res.result.products;
        }
        else {
          this.helper.showAlert(res.error.message, res.error.details);
        }
      },
      error => { }
    );

  }

  loadOtherProducts() {
    this.doService.getOtherProducts().subscribe(
      res => {
        if (res.success && !res.unAuthorizedRequest) {
          this.products = res.result.products;

        }
        else {
          this.helper.showAlert(res.error.message, res.error.details);
        }
      },
      error => { }
    );
  }

  updatePrice() {
    this.selectProduct.price = this.selectProduct.quantity * this.selectProduct.unitPrice;
  }

  productChanged(event, selectedProduct) {
    let selectedItem = _.find(this.products, { 'id': Number(this.selectProduct.productId) });
    this.selectProduct.unitPrice = selectedItem.mrp;

    this.selectProduct.fullProductName = selectedProduct.valueAccessor._text;
  }

}
