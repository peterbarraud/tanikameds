import { Component, OnInit } from '@angular/core';
import { ComponentBase } from './../app.component-base';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent extends ComponentBase implements OnInit {

  ngOnInit() {
    this.componentName = 'category';
    this.getTracks();
  }

}
