import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertRequestedComponent } from './alert-requested.component';

describe('AlertRequestedComponent', () => {
  let component: AlertRequestedComponent;
  let fixture: ComponentFixture<AlertRequestedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertRequestedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertRequestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
