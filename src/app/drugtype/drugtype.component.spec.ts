/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DrugtypeComponent } from './drugtype.component';

describe('DrugtypeComponent', () => {
  let component: DrugtypeComponent;
  let fixture: ComponentFixture<DrugtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
