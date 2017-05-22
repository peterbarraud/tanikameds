import { Component, Input, Attribute, Output, EventEmitter } from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modaldialog',
  templateUrl: './modaldialog.component.html',
  styleUrls: ['./modaldialog.component.css'],
})
export class ModaldialogComponent {
  @Input() private track;
  @Output() private deleteTrack = new EventEmitter();
  private modalRef: NgbModalRef;

  constructor(private modalService: NgbModal) {}

  private open(content) {
    this.modalRef = this.modalService.open(content);
  }

  private onDeleteTrack(){
    this.modalRef.close();
    this.deleteTrack.emit(this.track);
  }


}