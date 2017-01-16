import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers/index';

declare var $: any;

@Component({
  selector: 'pin-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  inputs: ["title", "klass", "size"],
  animations: [
    trigger('flyInDown', [
      state('in', style({ transform: 'translateY(0)' })),
      transition('void => *', [
        style({ transform: 'translateY(-100%)' }),
        animate(500)
      ]),
      transition('* => void', [
        animate(500, style({ transform: 'translateY(100%)' }))
      ])
    ])
  ]

})

export class ModalComponent implements OnInit, OnDestroy, AfterViewInit {
  title: string;
  klass: string;
  size: string;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $(document).foundation();
  }

  ngOnDestroy() {
    $('.reveal').remove();
    $('.reveal-overlay').remove();
  }

}
