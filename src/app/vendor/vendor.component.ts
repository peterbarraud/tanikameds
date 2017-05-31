import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ComponentBase } from './../app.component-base';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent extends ComponentBase implements OnInit {
  // so we're not going to allow create vendor
  @ViewChild('cannotCreateVendor') cannotCreateVendorModal: ElementRef;
  // Mostly we use ngOnInit for all the initialization/declaration and avoid stuff to work in the constructor.
  // The constructor should only be used to initialize class members but shouldn't do actual "work".
  // http://stackoverflow.com/questions/35763730/difference-between-constructor-and-ngoninit
  ngOnInit() {
    this.componentName = 'vendor';
    this.getTracks();

  }

  createTrack(){
      // this.createvendor = true;
      this.modalService.open(this.cannotCreateVendorModal);
      console.log("got here");
  }
  deleteTrack(object){
      this.restService.deleteObject(this.componentName, object.id)
      .subscribe(retval =>{
            this.tracks = retval.updatedcollection.items;
      });
  }
  
  
  
}
