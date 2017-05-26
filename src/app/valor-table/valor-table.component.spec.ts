import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorTableComponent } from './valor-table.component';

describe('ValorTableComponent', () => {
  let component: ValorTableComponent;
  let fixture: ComponentFixture<ValorTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValorTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
