import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromRoot from '../../../reducers';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as pin from '../../../actions/pin';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../models/user';
import { replace } from '@ngrx/router-store';

declare var $: any;
declare var Foundation: any;

@Component({
  selector: 'pin-pin-edit',
  templateUrl: './pin-edit.component.html',
  styleUrls: ['./pin-edit.component.scss']
})
export class PinEditComponent implements OnInit, AfterViewInit {
  pinForm: FormGroup;
  title: string;
  isNew = true;
  pin: any;
  pinIndex: string;
  subscription: Subscription;
  authUser: Observable<User>;
  pinTags: string[];

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
              this.pinTags = this.pin.tags.split(',');
              this.initForm();
            }
          );

          this.title = 'Update Pin';
        } else {
          this.isNew = true;
          this.pin = {};
          this.title = 'Create Pin';
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
    if (this.pinForm.valid) {
      if (this.isNew) {
        this.store.dispatch(new pin.AddPinAction(newPin));
      } else {
        this.store.dispatch(new pin.SavePinAction(newPin));
      }
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
    }catch (e){console.log(e); };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initForm() {
    this.pinForm = this.formBuilder.group({
      name: [, Validators.compose([
        Validators.required,
        Validators.maxLength(250),
        Validators.minLength(5)
      ])],
      image_url: [, Validators.compose([
        Validators.required,
        Validators.maxLength(250),
        Validators.pattern(RegExp('(https?:\/\/.*\.(?:png|jpg|jpeg|gif|png|svg))', 'i'))
      ])],
      url: [, Validators.compose([
        Validators.required,
        Validators.maxLength(250),
        Validators.pattern(RegExp('(https?:\/\/.*\.)', 'i'))
      ])],
      description: [, Validators.compose([
        Validators.required,
        Validators.maxLength(250),
        Validators.minLength(5)
      ])],
      tags: [, Validators.compose([Validators.required, Validators.maxLength(250)])],
      tagsArray: [],
      user_id: ['', Validators.required],
      id: ['', this.checkForNew()]
    });
  }

  checkForNew() {
    if (!this.isNew) {
      return Validators.required;
    }
  }

  onItemUpdate(event) {
    if (event) {
      this.pinTags.pop();
      this.pinTags.push(event.value);
    }
    this.pinForm.controls['tags'].setValue(this.pinTags.join(','));
  }

}
