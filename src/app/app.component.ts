import { Component, ViewChild } from '@angular/core';
import { Events, Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';


import { GettingStartedPage } from '../pages/getting-started/getting-started';
import { DoPage } from '../pages/do/do';
import { SurvayPage } from '../pages/survay/survay';
import { AddShopPage } from '../pages/add-shop/add-shop';
import { ProductWiseSurvayPage } from '../pages/product-wise-survay/product-wise-survay';

import { UserService } from '../providers/user-service/user-service';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = GettingStartedPage;

  pages: Array<{ title: string, component: any, icon: string }>;

  login: { username?: string, password?: string } = {};
  submitted = false;
  loggedIn = false;

  constructor(public events: Events, public platform: Platform, private userService: UserService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: GettingStartedPage, icon: 'home' },
      { title: 'Create DO', component: DoPage, icon: 'add' },
      { title: 'Add Shop', component: AddShopPage, icon: 'add-circle' },
      { title: 'Shop Survey', component: SurvayPage, icon: 'checkmark' },
      { title: 'Product Wise Survey', component: ProductWiseSurvayPage, icon: 'checkmark-circle' }
    ];

    this.userService.hasLoggedIn().then((hasLoggedIn) => {
      this.loggedIn = (hasLoggedIn == 'true');
      console.log("IsLogedIn: " + this.loggedIn);
    });

    this.listenToLoginEvents();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      this.userService.login(this.login.username);
      this.openPage(this.pages[0]);

      //this.nav.push(GettingStartedPage);
    }
  }

  logOut() {

    setTimeout(() => {
      this.userService.logout();
    }, 1000);

    window.location.reload();

    //let nav = this.app.getComponent('nav');

  }
  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.loggedIn = true;
    });

    this.events.subscribe('user:signup', () => {
      this.loggedIn = true;
    });

    this.events.subscribe('user:logout', () => {
      this.loggedIn = false;
    });
  }
}
