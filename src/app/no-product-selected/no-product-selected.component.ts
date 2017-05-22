import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-no-product-selected',
  templateUrl: './no-product-selected.component.html',
  styleUrls: ['./no-product-selected.component.css']
})
export class NoProductSelectedComponent implements OnInit {
  @Input() private noProducts:string;
  @Output() createTrack = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  onCreateTrack(){
    this.createTrack.emit();
  }  

}
