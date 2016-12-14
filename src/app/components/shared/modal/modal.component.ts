import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers/index';

declare var $:any;

@Component({
  selector: 'pin-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  inputs: ["title", "klass", "size"]
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
