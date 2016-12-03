import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/rx'
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Pin } from '../../../models/pin';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers'
import * as pin from '../../../actions/pin';
import * as comment from '../../../actions/comment';
import { User } from '../../../models/user';
import { Comment } from '../../../models/comment';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

declare var $:any;
declare var Foundation:any;

@Component({
  selector: 'pin-pin-detail',
  templateUrl: './pin-detail.component.html',
  styleUrls: ['./pin-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PinDetailComponent implements OnInit {
  private subscription: Subscription;
  private pinIndex: string;
  private pin: Observable<Pin>;
  private user: Observable<User>;
  private comments: Observable<Comment[]>;
  private userIsAuthenticated: Observable<boolean>;
  private authUser: Observable<User>;
  private commentForm: FormGroup;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private store: Store<fromRoot.AppState>,
    private formBuilder: FormBuilder
  ) {
    this.comments = this.store.select(fromRoot.getSelectedPinComments);
    this.userIsAuthenticated = this.store.select(fromRoot.getUserAuthStatus);
    this.authUser = this.store.select(fromRoot.getAuthUser);
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.pinIndex = params['id'];
        this.store.dispatch(new pin.SelectPinAction(this.pinIndex));
        this.store.dispatch(new comment.LoadCommentsAction(this.pinIndex));
        this.pin = this.store.select(fromRoot.getSelectedPin);
        this.user = this.store.select(fromRoot.getPinUser);
      }
    );
    this.loadModal()
    this.initCommentForm()
  }

  loadModal() {
    this.pin.subscribe(
      pin => {
        try{
          let el = $(`.pinModal-${this.pinIndex}`);
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
    );
  }

  onCommentSave() {
    const newComment = this.commentForm.value;
    this.store.dispatch(new comment.AddCommentAction(newComment));
    this.resetForm();
  }

  onOnDestroy(){
    this.subscription.unsubscribe()
  }

  getUser(id) {
    return this.store.select(fromRoot.getUserById(id))
  }

  initCommentForm(){
    this.commentForm = this.formBuilder.group({
      msg: ['', Validators.required],
      userId: ['', Validators.required],
      pinId: ['', Validators.required]
    });
  }

  onCancel() {
    this.resetForm();
  }

  resetForm() {
    this.commentForm.reset({msg: ''});
  }

}
