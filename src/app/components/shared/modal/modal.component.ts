import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers/index';

declare var $:any;

@Component({
  selector: 'pin-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  inputs: ["title", "klass", "size"]
})

export class ModalComponent implements OnInit, OnDestroy {
  title: string;
  klass: string;
  size: string;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    $('.reveal').remove();
    $('.reveal-overlay').remove();
  }

}
