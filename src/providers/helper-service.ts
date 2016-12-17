import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AlertController } from 'ionic-angular';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class HelperService {
  reqResUrl: string = 'http://spms.ngrok.io/api'
  constructor(private http: Http, private alertCtrl: AlertController) {
    console.log('Hello HelperService Provider');
  }

  getApiURI(): string {
    return this.reqResUrl;
  }

  extractData(res: Response) {
    let body = res.json();
    return body.result || {};
  }

  handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  showAlert(_title: string, _subTitle: any) {
    let alert = this.alertCtrl.create({
      title: _title,
      subTitle: _subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

}
