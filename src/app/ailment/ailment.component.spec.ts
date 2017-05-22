/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AilmentComponent } from './ailment.component';

describe('AilmentComponent', () => {
  let component: AilmentComponent;
  let fixture: ComponentFixture<AilmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AilmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AilmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
