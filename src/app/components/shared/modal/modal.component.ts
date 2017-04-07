import { Input } from '@angular/core';
import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  state,
  transition,
  trigger,
  style,
  animate
} from '@angular/core';

declare var $: any;

@Component({
  selector: 'pin-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations: [
    trigger('flyInDown', [
      state('in', style({ transform: 'translateY(0)' })),
      transition('void => *', [
        style({ transform: 'translateY(-100%)' }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ transform: 'translateY(100%)' }))
      ])
    ])
  ]

})

export class ModalComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() title: string;
  @Input() klass: string;
  @Input() size: string;

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
