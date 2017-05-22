/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RailroadComponent } from './railroad.component';

describe('RailroadComponent', () => {
  let component: RailroadComponent;
  let fixture: ComponentFixture<RailroadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RailroadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RailroadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
