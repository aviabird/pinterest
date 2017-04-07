import { Store } from '@ngrx/store';
import { Component, OnInit, Input } from '@angular/core';
import * as fromRoot from '../../../../reducers';
import * as comment from '../../../../actions/comment';

@Component({
  selector: 'pin-pin-comment',
  templateUrl: './pin-comment.component.html',
  styleUrls: ['./pin-comment.component.scss']
})
export class PinCommentComponent implements OnInit {
  @Input() comment;
  @Input() authUser;


  constructor(
    private store: Store<fromRoot.AppState>,
  ) { }

  ngOnInit() {
  }

  onCommentDelete(id) {
    this.store.dispatch(new comment.DeleteCommentAction(id));
  }

}
