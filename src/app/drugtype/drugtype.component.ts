import { Component, OnInit } from '@angular/core';
import { ComponentBase } from './../app.component-base';

@Component({
  selector: 'app-drugtype',
  templateUrl: './drugtype.component.html',
  styleUrls: ['./drugtype.component.css']
})
export class DrugtypeComponent extends ComponentBase implements OnInit {

  ngOnInit() {
    this.componentName = 'drugtype';
    this.getTracks();
  }

}