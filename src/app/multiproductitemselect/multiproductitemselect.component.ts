import { Component, OnInit, Input, Output, Attribute, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-multi-product-item-select',
  templateUrl: './multiproductitemselect.component.html',
  styleUrls: ['./multiproductitemselect.component.css']
})
export class MultiProductItemsSlectComponent implements OnInit {

  private selectedItemValue:string[];
  @Input() get selectedItem():string[]{
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
  @Input() private helppopupplacement:string;

  private currentItem:string;


  constructor() { }

  ngOnInit() {
  }
  onKey(event) {
    if (event.code === "Escape"){
      this.currentItem = null;
    }
    else if (event.code === "Enter"){
      this.selectedItem.push(this.currentItem);
      this.currentItem = null;
    }
  }
  clearitembox (){
    this.currentItem = null;
  }
  removeitem(event) {
    this.selectedItem.splice(this.selectedItem.indexOf(event),1)
  }
}
