import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Pin } from '../../../models/pin';
import { Subscription } from 'rxjs/rx';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromRoot from '../../../reducers';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as pin from '../../../actions/pin';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../models/user';
import { replace } from '@ngrx/router-store';

declare var $:any;
declare var Foundation:any;

@Component({
  selector: 'pin-pin-edit',
  templateUrl: './pin-edit.component.html',
  styleUrls: ['./pin-edit.component.scss']
})
export class PinEditComponent implements OnInit, AfterViewInit {
  private pinForm: FormGroup;
  private title: string;
  private isNew = true;
  private pin: any;
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
    this.loadModal();
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
          this.pinIndex = params['id'];
          this.isNew = false;
          this.store.dispatch(new pin.SelectPinAction(this.pinIndex));
        
          this.store.select(fromRoot.getSelectedPin).subscribe(
            pin => {
              this.pin = pin;
              this.initForm();
            }
          );

          this.title = "Update Pin";
        } else {
          this.isNew = true;
          this.pin = {};
          this.title = "Create Pin";
          this.initForm();
        }
      }
    );
  }

  ngAfterViewInit() {
    this.loadModal();
  }

  onPinSave() {
    const newPin = this.pinForm.value;
    if(this.pinForm.valid){
      this.store.dispatch(new pin.AddPinAction(newPin));
      this.closeModal();
    }
  }

  onPinDelete(id) {
    this.store.dispatch(new pin.DeletePinAction(id));
    this.closeModal();
  }

  onCancel(){
    this.closeModal();
  }

  closeModal() {
    this.store.dispatch(replace(['']));
    $('body').toggleClass('is-reveal-open');
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
    this.pinForm = this.formBuilder.group({
      name: [, Validators.required],
      image_url: [, Validators.required],
      url: [, Validators.required],
      description: [, Validators.required],
      tags: [, Validators.required],
      user_id: ['', Validators.required]
    });
  }

}
