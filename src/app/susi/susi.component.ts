import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import { Router } from '@angular/router';

import { AppUserService } from './../app-user.service';


@Component({
  selector: 'app-susi',
  templateUrl: './susi.component.html',
  styleUrls: ['./susi.component.css']
})
export class SusiComponent {
  private username:string = null;
  private password:string = null;
  //you need the private qualifier if you plan to use the injectable outside the constructor
  constructor(private appUserService:AppUserService, private router:Router) { }
   loginuser(){
     this.appUserService.ValidateUser(this.username, this.password, this.router);
   }
   badlogin():Boolean {
     return this.appUserService.BadLogin;
   }
}
