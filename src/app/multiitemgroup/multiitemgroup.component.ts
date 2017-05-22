import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-multiitemgroup',
  templateUrl: './multiitemgroup.component.html',
  styleUrls: ['./multiitemgroup.component.css']
})
export class MultiItemGroupComponent implements OnInit {

  @Input() private itemtitle: string;
  @Output() private itemRemove = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  removethisitem() {
    this.itemRemove.emit(this.itemtitle);
  }

}
