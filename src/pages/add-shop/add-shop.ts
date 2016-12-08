import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

/*
  Generated class for the AddShopPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'add-shop.html',
})
export class AddShopPage {
  shop: { zoneId?:number,distributorId?:number, shopName?: string, address?: string,ownerName?:string,ownerNumber?:string } = {};
  submitted = false;
  constructor(public nav: NavController) { }

  addShop(form) {
    this.submitted = true;

    if (form.valid) {


      //this.nav.push(GettingStartedPage);
    }
  }
}
