import { Component, OnInit } from '@angular/core';
import { Pin } from '../../../models/pin';

@Component({
  selector: 'pin-pin-item',
  templateUrl: './pin-item.component.html',
  styleUrls: ['./pin-item.component.css'],
  inputs: ['pin']
})
export class PinItemComponent implements OnInit {
  pin: Pin;

  constructor() { }

  ngOnInit() {
  }

}
