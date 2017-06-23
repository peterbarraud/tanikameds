import { Component, OnInit } from '@angular/core';
import { ComponentBase } from './../app.component-base';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent extends ComponentBase implements OnInit {
  // Mostly we use ngOnInit for all the initialization/declaration and avoid stuff to work in the constructor.
  // The constructor should only be used to initialize class members but shouldn't do actual "work".
  // http://stackoverflow.com/questions/35763730/difference-between-constructor-and-ngoninit
  ngOnInit() {
    this.componentName = 'orderstatus';
    this.getTracks();
  }
  
}
