import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentBase } from './../app.component-base';

@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.css']
})
export class CustomerOrderComponent extends ComponentBase implements OnInit {
  private orderStatuses:any;
  private currentStatusName:string;

  @ViewChild('cannotCreateOrder') private cannotCreateOrderModal
  // Mostly we use ngOnInit for all the initialization/declaration and avoid stuff to work in the constructor.
  // The constructor should only be used to initialize class members but shouldn't do actual "work".
  // http://stackoverflow.com/questions/35763730/difference-between-constructor-and-ngoninit
  ngOnInit() {
    this.componentName = 'customerorder';
    this.getTracks();
    this.getOrderStatuses();
    this.currentStatusName = this.appuserService.DefaultOrderStatusName;
  }
  getTracks(){
    this.viewOrdersByStatus(this.appuserService.DefaultOrderStatusId);
  }
  getOrderStatuses(){
    this.restService.getObjectCollection('orderstatus')
    .subscribe(retval =>{
      this.orderStatuses = retval.items;
    });        
    
  }
  createTrack(){
      // this.createvendor = true;
      this.modalService.open(this.cannotCreateOrderModal);
  }
  selectTrack(track) {
    this.restService.getSelectedOrderDetails(track.id)
    .subscribe(retval =>{
      this.selectedTrack = retval;
      this.setDefaultFocus();
    });        
      
  }
  setOrderStatus(argInfo){
    let order = argInfo.customerOrder;
    let customerorder = {
      id: order.id,
      vendorid: order.vendorid,
      customerid: order.customerid,
      statusid: order.statusid,
      updatedate_ts: order.updatedate_ts,
      orderdate_ts: order.orderdate_ts
    }
    this.tracksavestatus = "Saving";
    this.modalService.open(this.saveProgressModal);
    this.restService.saveObject("customerorder",customerorder)
    .subscribe(retval =>{
        this.restService.getOrdersByVendor(this.appuserService.UserId, argInfo.currentStatusId)
        .subscribe(retval =>{
          this.tracks = retval.items;
          this.tracksavestatus = "Done";
        });
    });
  }  
  viewOrdersByStatus(orderStatusId){
        let tracks = this.appdataService.getDataByModule(this.componentName);
        if (tracks === undefined){
          this.restService.getOrdersByVendor(this.appuserService.UserId, orderStatusId)
          .subscribe(retval =>{
            this.tracks = retval.items;
            if (this.orderStatuses){
              this.orderStatuses.forEach(orderStatus => {
                if (orderStatus.id == orderStatusId){
                  this.currentStatusName = orderStatus.name;
                }
              });
            }
          });
        } else {
            this.tracks = tracks;
        }


  }
}