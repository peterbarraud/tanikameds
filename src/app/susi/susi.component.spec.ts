/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SusiComponent } from './susi.component';

describe('SusiComponent', () => {
  let component: SusiComponent;
  let fixture: ComponentFixture<SusiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SusiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SusiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
