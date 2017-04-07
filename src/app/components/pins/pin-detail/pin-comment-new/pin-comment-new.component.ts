import { User } from './../../../../models/user';
import { Pin } from './../../../../models/pin';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import * as fromRoot from '../../../../reducers';
import * as comment from '../../../../actions/comment';

@Component({
  selector: 'pin-pin-comment-new',
  templateUrl: './pin-comment-new.component.html',
  styleUrls: ['./pin-comment-new.component.scss']
})
export class PinCommentNewComponent implements OnInit {
  commentForm: FormGroup;
  userIsAuthenticated: Observable<boolean>;
  @Input() authUser: User;
  @Input() pin: Pin;


  constructor(
    private store: Store<fromRoot.AppState>,
    private formBuilder: FormBuilder
  ) {
    this.userIsAuthenticated = this.store.select(fromRoot.getUserAuthStatus);
  }

  ngOnInit() {
    this.initCommentForm();
  }

  onCommentSave() {
    const newComment = this.commentForm.value;
    if(this.commentForm.valid){
      this.store.dispatch(new comment.AddCommentAction(newComment));
      this.resetForm();
    }
  }

  initCommentForm(){
    this.commentForm = this.formBuilder.group({
      message: ['', Validators.required],
      user_id: [this.authUser.id, Validators.required],
      pin_id: [this.pin.id, Validators.required]
    });
  }

  onCancel() {
    this.resetForm();
  }

  resetForm() {
    this.initCommentForm();
  }

  onKeyPressed(keyCode){
    if(keyCode === 13){
      this.onCommentSave();
    }
  }

}
