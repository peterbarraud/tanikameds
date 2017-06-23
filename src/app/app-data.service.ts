// we dont want to get the data, for each module every time a user navigates to that module
// This service stores the data by module the first time the module is hit
// If the data already exists, we dont make a server hit, we get the data locally
import { Injectable } from '@angular/core';

@Injectable()
export class AppDataService {
  private appdata:any;
  constructor() { 
    this.appdata = {};
  }
  getDataByModule(modulename:string){
    return this.appdata[modulename];
  }
  setDataByModule(modulename:string, data:any){
    this.appdata[modulename] = data;
  }



}
