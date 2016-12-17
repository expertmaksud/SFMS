import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Headers,RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Rx';

import { LoginModel } from '../models/login.model';
import { ReqResponse } from '../models/response.model';

import { HelperService } from './helper-service';


@Injectable()
export class UserService {
  data: any = null;
  HAS_LOGGED_IN = 'hasLoggedIn';

  constructor(private http: Http, private events: Events, private storage: Storage,
    private helper: HelperService) { }

  checkCredential(body: LoginModel): Observable<ReqResponse> {
    let userUrl = this.helper.getApiURI() + '/services/app/user/checkSalesPerson';
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option 


    return this.http.post(userUrl, bodyString, options)  // ...using post request
      .map(result => <ReqResponse>result.json()) // ...and calling .json() on the response to return data
      .catch(this.helper.handleError); //...errors if any

  }

  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get('assets/data/data.json')
        .map(this.processData);
    }
  }

  processData(data) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to sessions
    this.data = data.json();
    this.data.tracks = [];
    return this.data;
  }

  login(username, password) {
    let loginModel = new LoginModel("", username, password);
    this.checkCredential(loginModel).subscribe(
      res => {
        if (res.success && !res.unAuthorizedRequest) {
          this.storage.set(this.HAS_LOGGED_IN, true);
          this.storage.set('userid', res.result.id);
          this.storage.set('userdisplayname', res.result.name);
          this.setUsername(username);
          this.events.publish('user:login');
        }
        else {
          this.helper.showAlert(res.error.message, res.error.details);
        }
      },
      error => {
        this.helper.showAlert('Login Failed', error);
      }
    )

  };

  signup(username) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:signup');
  };

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.storage.remove('userid');
    this.storage.remove('userdisplayname');
    this.events.publish('user:logout');
  };

  setUsername(username) {
    this.storage.set('username', username);
  };

  getUsername() {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };

  getUserId() {
    return this.storage.get('userid');
  }

  getUserDisplayName() {
    return this.storage.get('userdisplayname').then((value) => {
      return value;
    });
  }
  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value;
    });
  }

  
}

