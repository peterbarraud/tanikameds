import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentBase } from './../app.component-base';

@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.css']
})
export class CustomerOrderComponent extends ComponentBase implements OnInit {
  @ViewChild('cannotCreateOrder') private cannotCreateOrderModal
  // Mostly we use ngOnInit for all the initialization/declaration and avoid stuff to work in the constructor.
  // The constructor should only be used to initialize class members but shouldn't do actual "work".
  // http://stackoverflow.com/questions/35763730/difference-between-constructor-and-ngoninit
  ngOnInit() {
    this.componentName = 'customerorder';
    this.getTracks();
  }
  getTracks(){
    this.restService.getOrdersByVendor(this.appuserService.UserId)
    .subscribe(retval =>{
      this.tracks = retval.items;
    });        
  }
  createTrack(){
      // this.createvendor = true;
      this.modalService.open(this.cannotCreateOrderModal);
  }
  selectTrack(track) {
      // interestingly should this get the data for a selected track from the list of tracks or should it make another rest call?
      this.selectedTrack = track;
      this.setDefaultFocus();
  }
  
  
}