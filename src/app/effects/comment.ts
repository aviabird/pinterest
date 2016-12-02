import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import * as comment from '../actions/comment';
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
    .map((comments) => new comment.LoadCommentsSuccessAction(comments))

}