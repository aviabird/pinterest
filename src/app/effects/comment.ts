import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import * as comment from '../actions/comment';
import * as userAuth from '../actions/user-auth';
import { AppState } from '../reducers/index';
import { PinDataService } from '../services/pin-data';
import { Comment } from '../models/comment';

@Injectable()
export class CommentEffects {
  constructor(
    private actions$: Actions,
    private pinDataService: PinDataService,
    private store: Store<AppState>
  ) {}

  @Effect() loadComments$: Observable<Action> = this.actions$
    .ofType(comment.ActionTypes.LOAD_COMMENTS)
    .map(action => action.payload)
    .switchMap((pinId) => this.pinDataService.getComments(pinId))
    .filter((comments: Comment[]) => comments.length > 0)
    .map(comments => {
      setTimeout(() => {
        let userIds = comments.map(comment => comment.userId);
        this.store.dispatch(new userAuth.FindUsersAction(userIds));
      }, 1000)
      return comments;
    })
    .map((comments) => new comment.LoadCommentsSuccessAction(comments))

  @Effect() addComment$: Observable<Action> = this.actions$
    .ofType(comment.ActionTypes.ADD_COMMENT)
    .map<Comment>(action => action.payload)
    .map(comment => this.pinDataService.addComment(comment))
    .map(() => new comment.AddCommentSuccessAction())

  @Effect() deleteComment$: Observable<Action> = this.actions$
    .ofType(comment.ActionTypes.DELETE_COMMENT)
    .map<string>(action => action.payload)
    .map(id => {
      this.pinDataService.deleteComment(id)
      return id;
    })
    .map((id) => new comment.DeleteCommentSuccessAction(id))

}