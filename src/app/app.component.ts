import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppUserService } from './app-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private appUserService:AppUserService){}  
  // Mostly we use ngOnInit for all the initialization/declaration and avoid stuff to work in the constructor.
  // The constructor should only be used to initialize class members but shouldn't do actual "work".
  // http://stackoverflow.com/questions/35763730/difference-between-constructor-and-ngoninit  
  ngOnInit() {
    this.gotoLogin();
  }
  gotoRoute (route) {
    this.appUserService.NavigateUser(this.router, route);
  }
  isValidUser() {
    return this.appUserService.IsValidUser;
  }
  isAdminUser(){
    return this.appUserService.IsAdminUser;
  }

  gotoLogin(){
    this.appUserService.LogoutUser(this.router);
  }

  navClass(route){
    let thisClass = [
      'btn', 'btn-sm', 'align-middle'
    ];
    if ("/" + route === this.router.url) {
      thisClass.push('disabled')
      thisClass.push('btn-primary')
    } else {
      thisClass.push('btn-outline-primary')
    }
    return thisClass;
  }
}
