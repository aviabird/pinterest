import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../../../../reducers'
import * as comment from '../../../../actions/comment';

@Component({
  selector: 'pin-pin-comment',
  templateUrl: './pin-comment.component.html',
  styleUrls: ['./pin-comment.component.scss'],
  inputs: ["comment", "authUser"]
})
export class PinCommentComponent implements OnInit {

  constructor(
    private store: Store<fromRoot.AppState>,
  ) { }

  ngOnInit() {
  }

  onCommentDelete(id) {
    this.store.dispatch(new comment.DeleteCommentAction(id))
  }

}
