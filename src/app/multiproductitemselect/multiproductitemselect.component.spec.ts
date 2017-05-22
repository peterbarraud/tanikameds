/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MultiProductItemsSlectComponent } from './multiproductitemselect.component';

describe('MultiproductitemselectComponent', () => {
  let component: MultiProductItemsSlectComponent;
  let fixture: ComponentFixture<MultiProductItemsSlectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiProductItemsSlectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiProductItemsSlectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
