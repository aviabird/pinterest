import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Pin } from '../../../models/pin';
import { Subscription } from 'rxjs/rx';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromRoot from '../../../reducers';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as pin from '../../../actions/pin';
import { Observable } from 'rxjs/Observable';

declare var $:any;
declare var Foundation:any;

@Component({
  selector: 'pin-pin-edit',
  templateUrl: './pin-edit.component.html',
  styleUrls: ['./pin-edit.component.scss']
})
export class PinEditComponent implements OnInit, AfterViewChecked {
  private pinForm: FormGroup;
  private isNew = true;
  private pin: Pin;
  private pinIndex: string;
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.AppState>,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
          this.pinIndex = params['id'];
          this.isNew = false;
          this.store.dispatch(new pin.SelectPinAction(this.pinIndex));
        
          this.store.select(fromRoot.getSelectedPin).subscribe(
            pin => this.pin = pin
          );
        } else {
          this.isNew = true;
          this.pin = null;
        }
        this.initForm();
      }
    );
  }

  ngAfterViewChecked(){
    this.loadModal();
  }

  loadModal() {
    try{
      let elSelector = '.pinEditModal';
      let el = $(elSelector);
      if (el.length) {
        if (el.data('zfPlugin')) {
          el.foundation('open');
        }else{
          new Foundation.Reveal(el);
          el.foundation('open');
        }
      }
    }catch(e){console.log(e)};
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initForm() {
    let pinName= "";
    let pinImageUrl= "";
    let pinDescription= "";

    if (!this.isNew) {
      pinName = this.pin.name;
      pinImageUrl = this.pin.image_url;
      pinDescription = this.pin.description;
    }

    this.pinForm = this.formBuilder.group({
      name: [pinName, Validators.required],
      imagePath: [pinImageUrl, Validators.required],
      description: [pinDescription, Validators.required]
    });
  }

}
