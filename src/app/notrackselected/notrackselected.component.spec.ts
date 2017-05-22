/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NotrackselectedComponent } from './notrackselected.component';

describe('NotrackselectedComponent', () => {
  let component: NotrackselectedComponent;
  let fixture: ComponentFixture<NotrackselectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotrackselectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotrackselectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
