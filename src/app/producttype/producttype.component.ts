import { Component, OnInit } from '@angular/core';
import { ComponentBase } from './../app.component-base';

@Component({
  selector: 'app-producttype',
  templateUrl: './producttype.component.html',
  styleUrls: ['./producttype.component.css']
})
export class ProducttypeComponent extends ComponentBase implements OnInit {

  ngOnInit() {
    this.componentName = 'producttype';
    this.getTracks();
  }

}