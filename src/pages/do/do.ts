import { Component } from "@angular/core"
import { NavController, AlertController, ModalController, ViewController } from 'ionic-angular';

/*
  Generated class for the DoPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'do.html',
})
export class DoPage {

  do: { zoneId?: number, distributorId?: number, paymentMode?: number, creditDays?: number, remarks?: string } = {};
  products: { productId?: number }[] = [];
  submitted = false;
  constructor(public nav: NavController, public modalCtrl: ModalController) {

  }

  openModal() {
    let modal = this.modalCtrl.create(AddProductModalPage);
    modal.present(modal);
    // Getting data from the modal:

    modal.onDidDismiss(data => {
      var localProduct = {
        productId: data
      };
      this.products.push(localProduct);
      console.log('MODAL DATA', data);
    });
  }
}


@Component({
  templateUrl: 'add-product-modal.html'
})
export class AddProductModalPage {
  //character;
  productId: number = 0;
  constructor(public viewCtrl: ViewController, public alertCtrl: AlertController) {
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
    this.viewCtrl.dismiss("Test");
  }

  addProduct() {
    this.showAlert();
    this.viewCtrl.dismiss(this.productId);
  }
}
