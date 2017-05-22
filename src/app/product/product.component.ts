import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import { ComponentBase } from './../app.component-base';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent extends ComponentBase implements OnInit{

  private itemnameslists = [];
  public showGuidedHelp:string;

  ngOnInit() {
    this.componentName = 'product';
    this.showGuidedHelp = "";
    this.getTracks();
    this.getItemNamesList();
  }


  // override base function since we need to call the specific getProductDetails rest service 
  selectTrack(track) {
        this.restService.getProductDetails(track.id)
        .subscribe(retval =>{
          this.selectedTrack = retval;
          this.setDefaultFocus();
          this.showGuidedHelp = "";
        });
  }
  createTrack(isguided=false){
      this.restService.newProduct()
      .subscribe(retval =>{
          this.selectedTrack = retval;
          this.setDefaultFocus();
          if (isguided){
            this.showGuidedHelp = "focus:focusout";
          }
      });
  }
  saveTrack() {
      this.restService.saveObject(this.componentName,this.selectedTrack)
      .subscribe(retval =>{
          this.tracks = retval.objectcollection.items;
          this.selectedTrack = retval.saveobject;
          this.getItemNamesList();
      });
  }
  
  getItemNamesList() {
        this.restService.getItemNamesList()
        .subscribe(retval =>{
          this.itemnameslists = retval;
        });
    
  }
  clearitembox(selectedItemName) {
    this.selectedTrack[selectedItemName] = null;
  }
  keyDownFunction(event){
    if (event.code === "Enter"){
      event.preventDefault();
      return false;
    }
  }
  

}