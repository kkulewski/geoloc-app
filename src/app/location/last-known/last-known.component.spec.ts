import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastKnownLocationComponent } from './last-known.component';

describe('LastKnownLocationComponent', () => {
  let component: LastKnownLocationComponent;
  let fixture: ComponentFixture<LastKnownLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastKnownLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastKnownLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
