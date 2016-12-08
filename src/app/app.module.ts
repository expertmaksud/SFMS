import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';

import { Page2 } from '../pages/page2/page2';
import { GettingStartedPage } from '../pages/getting-started/getting-started';
import { DoPage } from '../pages/do/do';
import { AddProductModalPage } from '../pages/do/do'
import { SurvayPage } from '../pages/survay/survay';
import { AddShopPage } from '../pages/add-shop/add-shop';
import { ProductWiseSurvayPage } from '../pages/product-wise-survay/product-wise-survay';
import { LoginPage } from '../pages/login/login';

import { UserService } from '../providers/user-service/user-service';

@NgModule({
  declarations: [
    MyApp,
    Page2,
    GettingStartedPage,
    DoPage,
    AddProductModalPage,
    SurvayPage,
    AddShopPage,
    ProductWiseSurvayPage,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page2,
    GettingStartedPage,
    DoPage,
    AddProductModalPage,
    SurvayPage,
    AddShopPage,
    ProductWiseSurvayPage,
    LoginPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, UserService, Storage]
})
export class AppModule { }
