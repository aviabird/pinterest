import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Pin } from '../../../models/pin';

declare var $:any;
declare var Foundation:any;

@Component({
  selector: 'pin-pin-item',
  templateUrl: './pin-item.component.html',
  styleUrls: ['./pin-item.component.css'],
  inputs: ['pin'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PinItemComponent implements OnInit {
  pin : Pin;

  constructor() {}

  ngOnInit() {}

  onClick() {
    try{
      setTimeout(() => {
        let el = $('.pinModal-' + this.pin.id);
        if (el.length) {
          if (el.data('zfPlugin')) {
            el.foundation('open');
          }else{
            new Foundation.Reveal(el);
            el.foundation('open');
          }
        }
      }, 100);
    }catch(e){console.log('.pinModal-' + this.pin.id + e)};
  }

}
