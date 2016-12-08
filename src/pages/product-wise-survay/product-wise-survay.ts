import {Component} from "@angular/core";
import { NavController, ToastController} from 'ionic-angular';

/*
  Generated class for the ProductWiseSurvayPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'product-wise-survay.html',
})
export class ProductWiseSurvayPage {
  survey: { zoneId?: number, distributorId?: number, shopId?: number, productId?: number, quantity?: number } = {};
  submitted = false;
  constructor(public nav: NavController, public toastCtrl: ToastController) { }

  addProductSurvey(form) {
    this.submitted = true;

    if (form.valid) {


      //this.nav.push(GettingStartedPage);
    }
  }

  onProductChange() {

    this.showPreviousSurveyData();

  }

  showPreviousSurveyData() {
    let toast = this.toastCtrl.create({
      message: 'Previous survey on 12/05/2016 and quantity was 340.',
      duration: 15000
    });

    toast.present(toast);
  }
}
