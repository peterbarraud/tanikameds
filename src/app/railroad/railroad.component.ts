import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-railroad',
  templateUrl: './railroad.component.html',
  styleUrls: ['./railroad.component.css']
})
export class RailroadComponent {
  @Input() private tracks:any;
  @Input() private trackTitle:String;
  @Output() private refreshTracks = new EventEmitter();
  @Output() private selectTrack = new EventEmitter();
  @Output() private emtDeleteTrack = new EventEmitter();
  @Output() private createTrack = new EventEmitter();
  selectedTrack;

  constructor() { }

  getTrackStyle(track){
    let trackStyle = {
      "list-group-item":true,
      "list-group-item-action":true,
    }
    if (this.selectedTrack && track.id === this.selectedTrack.id){
      trackStyle["active"] = true;
    }
    return trackStyle;
  }
  onSelectTrack(track){
    this.selectedTrack = track;
    this.selectTrack.emit(track);
  }
  onRefreshTracks() {
    this.refreshTracks.emit();
  }
  deleteTrack(track){
    // we're goint to broadcast this event to the parent
    this.emtDeleteTrack.emit(track);
  }
  onCreateTrack(){
    this.createTrack.emit();
  }
}
