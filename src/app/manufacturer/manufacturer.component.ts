import { Component, OnInit } from '@angular/core';
import { ComponentBase } from './../app.component-base';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent extends ComponentBase implements OnInit {

  ngOnInit() {
    this.componentName = 'manufacturer';
    this.getTracks();
  }

}