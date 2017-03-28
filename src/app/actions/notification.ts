import { Action } from '@ngrx/store';
import { type } from '../util';
import { Comment } from '../models/comment';
import { Toastr } from '../models/toastr';

export const ActionTypes = {
  SHOW_PROGRESS:                    type('[Notification] Show Progress'),
  SHOW_PROGRESS_SUCCESS:            type('[Notification] Show Progress Success'),
  COMPLETE_PROGRESS:                type('[Notification] Complete Progress'),
  COMPLETE_PROGRESS_SUCCESS:        type('[Notification] Complete Progress Success'),
  POP_NOTIFICATION:                 type('[Notification] Pop Notification'),
  POP_NOTIFICATION_SUCCESS:         type('[Notification] Pop Notification Succcess')
};

export class ShowProgressAction implements Action {
  type = ActionTypes.SHOW_PROGRESS;

  constructor(public payload?: any) { };
}

export class ShowProgressSuccessAction implements Action {
  type = ActionTypes.SHOW_PROGRESS_SUCCESS;

  constructor(public payload?: any) { };
}

export class CompleteProgressAction implements Action {
  type = ActionTypes.COMPLETE_PROGRESS;

  constructor(public payload?: any) { };
}

export class CompleteProgressSuccessAction implements Action {
  type = ActionTypes.COMPLETE_PROGRESS_SUCCESS;

  constructor(public payload?: any) { };
}

export class PopNotificationAction implements Action {
  type = ActionTypes.POP_NOTIFICATION;

  constructor(public payload: Toastr) { };
}

export class PopNotificationSuccessAction implements Action {
  type = ActionTypes.POP_NOTIFICATION_SUCCESS;

  constructor(public payload: Toastr) { };
}

export type Actions
  = ShowProgressAction
  | ShowProgressSuccessAction
  | CompleteProgressAction
  | CompleteProgressSuccessAction
  | PopNotificationAction
  | PopNotificationSuccessAction;
