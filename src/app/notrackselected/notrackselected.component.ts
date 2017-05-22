import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notrackselected',
  templateUrl: './notrackselected.component.html',
  styleUrls: ['./notrackselected.component.css']
})
export class NotrackselectedComponent implements OnInit {
  @Input() private trackTitle:String;
  @Input() private noTracks:string;
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
