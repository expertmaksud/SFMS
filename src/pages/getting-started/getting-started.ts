import {Component} from "@angular/core";
import { NavController} from 'ionic-angular';
import {DoPage}  from '../do/do';
import {SurvayPage} from '../survay/survay';
import {AddShopPage} from '../add-shop/add-shop';
import {ProductWiseSurvayPage} from '../product-wise-survay/product-wise-survay';


@Component({
  templateUrl: 'getting-started.html'
})
export class GettingStartedPage {
  constructor(public nav: NavController) {
    this.nav = nav;
  }

  openDOPage() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //alert(page);
    //this.nav.push(page);
    this.nav.setRoot(DoPage);
  }
  
  openSurvayPage() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //alert(page);
    //this.nav.push(page);
    this.nav.setRoot(SurvayPage);
  }
  
  openAddNewShopPage() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //alert(page);
    //this.nav.push(page);
    this.nav.setRoot(AddShopPage);
  }
  
  openPWSurvayPage() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //alert(page);
    //this.nav.push(page);
    this.nav.setRoot(ProductWiseSurvayPage);
  }
}
