import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRailRoadComponent } from './order-rail-road.component';

describe('OrderRailRoadComponent', () => {
  let component: OrderRailRoadComponent;
  let fixture: ComponentFixture<OrderRailRoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderRailRoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderRailRoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
