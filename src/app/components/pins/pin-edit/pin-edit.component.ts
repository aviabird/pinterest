import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Pin } from '../../../models/pin';
import { Subscription } from 'rxjs/rx';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromRoot from '../../../reducers';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as pin from '../../../actions/pin';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../models/user';
 import { back } from '@ngrx/router-store';

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
  private authUser: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.AppState>,
    private formBuilder: FormBuilder
  ) {
    this.authUser = this.store.select(fromRoot.getAuthUser);
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

  onPinSave() {
    const newPin = this.pinForm.value;
    if(this.pinForm.valid){
      this.store.dispatch(new pin.AddPinAction(newPin));
    }
  }

  onPinDelete(id) {
    this.store.dispatch(new pin.DeletePinAction(id))
  }

  onCancel() {
    this.store.dispatch(back());
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
    let pinUrl = "";
    let pinDescription= "";
    let pinTags = "";

    if (!this.isNew) {
      pinName = this.pin.name;
      pinImageUrl = this.pin.image_url;
      pinUrl = this.pin.url;
      pinDescription = this.pin.description;
      pinTags = this.pin.tags;
    }

    this.pinForm = this.formBuilder.group({
      name: [pinName, Validators.required],
      image_url: [pinImageUrl, Validators.required],
      url: [pinUrl, Validators.required],
      description: [pinDescription, Validators.required],
      tags: [pinTags, Validators.required],
      user_id: ['', Validators.required]
    });
  }

}
