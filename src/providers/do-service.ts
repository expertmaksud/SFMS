import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { ReqResponse } from '../models/response.model';

import { HelperService } from './helper-service';


@Injectable()
export class DOService {

  constructor(public http: Http, private helper: HelperService) {
    console.log('Hello DOService Provider');
  }

  getAllZones() {
    let zoneURI = this.helper.getApiURI() + "/services/app/zone/getAllZones";
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option 

    return this.http.post(zoneURI, "{}", options)
      .map(result => <ReqResponse>result.json())
      .catch(this.helper.handleError);
  }

  getAllZoneDistributors(zoneId: number) {
    let distributirURI = this.helper.getApiURI() + "/services/app/distributor/getAllDistributorsByZoneId";
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option 
    let data = {
      zoneId: zoneId
    };

    return this.http.post(distributirURI, data, options)
      .map(result => <ReqResponse>result.json())
      .catch(this.helper.handleError);
  }

  getAllBrands() {
    let brandURI = this.helper.getApiURI() + "/services/app/brand/getBrandsByBrandType";
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option 
    let data = {
      brandType: 1
    };

    return this.http.post(brandURI, data, options)
      .map(result => <ReqResponse>result.json())
      .catch(this.helper.handleError);
  }

  getFinishProducts(brandId) {
    let finishProductURI = this.helper.getApiURI() + "/services/app/finishProduct/getFinishProductsByBrandWithoutVersion";
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option 
    let data = {
      brandId: brandId
    };

    return this.http.post(finishProductURI, data, options)
      .map(result => <ReqResponse>result.json())
      .catch(this.helper.handleError);
  }

  getRawMaterials() {
    let rawMaterialURI = this.helper.getApiURI() + "/services/app/rawMaterial/getAllRawMaterials";
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option 
   
    return this.http.get(rawMaterialURI, options)
      .map(result => <ReqResponse>result.json())
      .catch(this.helper.handleError);
  }

  getPackagingProducts() {
    let packagingURI = this.helper.getApiURI() + "/services/app/product/getAllPackagingProducts";
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option 
    let data = {};

    return this.http.post(packagingURI, data, options)
      .map(result => <ReqResponse>result.json())
      .catch(this.helper.handleError);
  }


  getOtherProducts() {
    let otherProductURI = this.helper.getApiURI() + "/services/app/product/getAllOtherProducts";
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option 
    let data = {};

    return this.http.post(otherProductURI, data, options)
      .map(result => <ReqResponse>result.json())
      .catch(this.helper.handleError);
  }

  createSalesRequisition(requisitions) {
    let createReqURI = this.helper.getApiURI() + "/services/sales/salesRequisition/CreateSalesRequisition";
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option 
    debugger
    let data = requisitions;

    return this.http.post(createReqURI, data, options)
      .map(result => <ReqResponse>result.json())
      .catch(this.helper.handleError);

  }

  sendMailToSalesPerson(input) {
    let sendMailURI = this.helper.getApiURI() + "/services/sales/salesRequisition/sendMailToSalesPerson";
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option 
    let data = input;

    return this.http.post(sendMailURI, data, options)
      .map(result => <ReqResponse>result.json())
      .catch(this.helper.handleError);
  }

  sendMailToBrandManager(input) {
    let sendMailURI = this.helper.getApiURI() + "/services/sales/salesRequisition/sendMailToBrandManager";
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option 
    let data = input;

    return this.http.post(sendMailURI, data, options)
      .map(result => <ReqResponse>result.json())
      .catch(this.helper.handleError);
  }

}
