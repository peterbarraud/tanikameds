import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order-rail-road',
  templateUrl: './order-rail-road.component.html',
  styleUrls: ['./order-rail-road.component.css']
})
export class OrderRailRoadComponent {
  @Input() private currentStatusId:Number;
  @Input() private tracks:any;
  @Input() private orderStatuses:any;
  @Input() private trackTitle:String;
  @Output() private refreshTracks = new EventEmitter();
  @Output() private selectTrack = new EventEmitter();
  @Output() private onSetOrderStatus = new EventEmitter();
  @Output() private emtCancelOrder = new EventEmitter();
  @Output() private createTrack = new EventEmitter();
  @Output() private onViewOrderByStatus = new EventEmitter();
  private selectedTrack:any;

  constructor() { 
  }

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
    console.log(this.currentStatusId);
    this.selectedTrack = track;
    this.selectTrack.emit(track);
  }
  onRefreshTracks() {
    this.refreshTracks.emit();
  }
  onCreateTrack(){
    this.createTrack.emit();
  }
  setOrderStatus(track, orderStatusId){
    track.statusid = orderStatusId;
    this.onSetOrderStatus.emit({
      customerOrder:track,
      currentStatusId: this.currentStatusId
      });
  }
  dropdownItemStyle(orderStatusId){
    let retval = {
      "dropdown-item":true,
      "disabled":false
    };
    if (this.currentStatusId === orderStatusId){
      retval["disabled"] = true;
    }
    return retval;
  }
  viewOrdersByStatus(statusid){
    if (this.currentStatusId !== statusid){
      this.onViewOrderByStatus.emit(statusid);
      this.currentStatusId = statusid;
    }
    
  }
}

