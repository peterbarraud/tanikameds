import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-no-order-selected',
  templateUrl: './no-order-selected.component.html',
  styleUrls: ['./no-order-selected.component.css']
})
export class NoOrderSelectedComponent implements OnInit {
  @Input() private trackTitle:String;
  @Input() private noTracks:string;
  @Input() private currentStatusName:string;
  @Output() createTrack = new EventEmitter();
  trackTitlePlural:string;

  constructor() { }

  ngOnInit() {
    // we're having to do this to handle Category vs Categories
    this.trackTitlePlural = this.trackTitle.replace(new RegExp("y$"),"ie") + 's';
  }
  onCreateTrack(){
    this.createTrack.emit();
  }  

}
