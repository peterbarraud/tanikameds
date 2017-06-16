import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class RestService {
  hostServerUrl: string = "http://localhost:9001/rest.api.php/"
//   hostServerUrl = "services/rest.api.php/"

  constructor(private http: Http) { }

  validateUser(userName:string, passWord: string): Observable<any>{
      return this.http.get(this.hostServerUrl + 'validateuser/' + userName + "/" + passWord + "/")
      .map( (res: Response) =>  res.json() )
  };

  newObect(className: string): Observable<any>{
      return this.http.get(this.hostServerUrl + 'getnewobjectbyclassname/' + className + "/")
      .map( (res: Response) =>  res.json() )    
  }

  getObect(className: string, id: number): Observable<any>{
      return this.http.get(this.hostServerUrl + 'getobjectbyid/' + className + '/' + id + "/")
        .map( (res: Response) =>  res.json() )
  }
  saveObject(className: string, objectToSave:any): Observable<any>{
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let options = new RequestOptions({ headers: headers });
      let url = this.hostServerUrl + 'saveobject/' + className + "/";
      return this.http.post(url, objectToSave, options)
        .map( (res: Response) =>  res.json() )
  }
  deleteObject(className :string, id: number): Observable<any>{
      return this.http.get(this.hostServerUrl + 'deleteobjectbyid/' + className + '/' + id + "/")
        .map( (res: Response) =>  res.json() )
  }

//   we need a specialized method for delete user because we want to prevent the delete of the last user from the front-end
  deleteUser(id: number): Observable<any>{
      return this.http.get(this.hostServerUrl + 'deleteuserbyid/' + id + "/")
        .map( (res: Response) =>  res.json() )
  }

  getObjectCollection(className:string): Observable<any>{
      return this.http.get(this.hostServerUrl + 'getobjectsbyclassname/' + className + '/')
      .map( (res: Response) =>  res.json() )
  }

//   special methods for product object
  getProductDetails(productid:number, userid: Number): Observable<any>{
      return this.http.get(this.hostServerUrl + 'getproductdetails/' + productid + '/' + userid + '/')
      .map( (res: Response) =>  res.json() )
  }
    
  newProduct(userid: Number): Observable<any>{
      return this.http.get(this.hostServerUrl + 'getnewproductdetails/' + userid + '/')
      .map( (res: Response) =>  res.json() )
  }

  getItemNamesList(): Observable<any>{
      return this.http.get(this.hostServerUrl + 'getproductitemsnamelist/')
      .map( (res: Response) =>  res.json() )
  }
  getUserNames(): Observable<any>{
      return this.http.get(this.hostServerUrl + 'getusernames/')
      .map( (res: Response) =>  res.json() )
  }
  getOrdersByVendor(userid:Number): Observable<any>{
      return this.http.get(this.hostServerUrl + 'getordersbyvendor/' + userid + '/')
      .map( (res: Response) =>  res.json() )
  }


}
