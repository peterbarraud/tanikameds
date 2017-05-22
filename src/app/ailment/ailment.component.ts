import { Component, OnInit } from '@angular/core';
import { ComponentBase } from './../app.component-base';


@Component({
  selector: 'app-ailment',
  templateUrl: './ailment.component.html',
  styleUrls: ['./ailment.component.css']
})
export class AilmentComponent extends ComponentBase implements OnInit {
  // Mostly we use ngOnInit for all the initialization/declaration and avoid stuff to work in the constructor.
  // The constructor should only be used to initialize class members but shouldn't do actual "work".
  // http://stackoverflow.com/questions/35763730/difference-between-constructor-and-ngoninit
  ngOnInit() {
    this.componentName = 'ailment';
    this.getTracks();
  }
  
}
