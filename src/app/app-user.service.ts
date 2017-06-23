import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable()
export class AppUserService {
  private _fullname:string = null;
  private _isvaliduser:Boolean = false;
  private _defaultroute:string = null;
  private _selectedRoute:string = null;
  private _badlogin:Boolean = null;
  private _userid:Number = -1;
  private _isAdminUser:Boolean = false;
  private _defaultOrderStatusId:Number = -1;
  private _defaultOrderStatusName:string = '';
  constructor(private restService: RestService) { }

  ValidateUser(username:string, password:string, router){

    this.restService.validateUser(username, password).
      
      subscribe(retval =>{
        this._isvaliduser = retval.invaliduser === 0 ? true : false;
        if (this._isvaliduser){
          this._defaultroute = retval.user.defaultroute;
          this._fullname = retval.user.name;
          this.NavigateUser(router);
          this._badlogin = false;
          this._userid = parseInt(retval.user.id);
          this._isAdminUser = retval.user.userclassname === "admin";
          this._defaultOrderStatusId = retval.defaultstatus.id;
          this._defaultOrderStatusName = retval.defaultstatus.name;
        }
        else {
          this._badlogin = true;

        }
    });
  }


  NavigateUser(router, route = this._defaultroute){
    if (this._selectedRoute !== route){
      // if route is susi, invalidate the user
      if (route === 'susi') {
        this._isvaliduser = false;
      }
      router.navigateByUrl("/" + route);
      this._selectedRoute = route;
    }
    
  }
  LogoutUser(router){
    this.NavigateUser(router, 'susi')
    
  }

  get FullName():string {
    return this._fullname;
  }
  get IsValidUser():Boolean {
    return this._isvaliduser;
  }
  get IsAdminUser():Boolean {
    return this._isAdminUser;
  }

  get BadLogin():Boolean {
    return this._badlogin;
  }
  get UserId():Number {
    return this._userid;
  }
  get DefaultOrderStatusId():Number {
    return this._defaultOrderStatusId;
  }
  get DefaultOrderStatusName():string {
    return this._defaultOrderStatusName
  }
}
