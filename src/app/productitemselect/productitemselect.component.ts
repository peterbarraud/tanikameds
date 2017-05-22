import { Component, Attribute, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-item-select',
  templateUrl: './productitemselect.component.html',
  styleUrls: ['./productitemselect.component.css']
})
export class ProductItemSelectComponent {
  private selectedItemValue:string;
  @Input() get selectedItem():string{
    return this.selectedItemValue;
  };
  @Output() selectedItemChange = new EventEmitter();
  set selectedItem(val){
    this.selectedItemValue = val;
    this.selectedItemChange.emit(this.selectedItemValue);
  }

  @Input() private itemnamelist;
  @Input() private itemname:string;
  @Input() private itemtitle:string;
  @Input() private showGuidedHelp:string;
  @Input() private helppopupplacement:string;

  constructor() { }

  onKey(event) {
    if (event.code === "Escape"){
      this.selectedItem = null;
    }
  }
  clearitembox (){
    this.selectedItem = null;
  }
}
