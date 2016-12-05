/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PinEditComponent } from './pin-edit.component';

describe('PinEditComponent', () => {
  let component: PinEditComponent;
  let fixture: ComponentFixture<PinEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
