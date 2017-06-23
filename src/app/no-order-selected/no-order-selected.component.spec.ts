import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoOrderSelectedComponent } from './no-order-selected.component';

describe('NoOrderSelectedComponent', () => {
  let component: NoOrderSelectedComponent;
  let fixture: ComponentFixture<NoOrderSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoOrderSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoOrderSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
