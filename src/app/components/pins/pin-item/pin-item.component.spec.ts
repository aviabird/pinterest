/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PinItemComponent } from './pin-item.component';

describe('PinItemComponent', () => {
  let component: PinItemComponent;
  let fixture: ComponentFixture<PinItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
