import { Action } from '@ngrx/store';
import { type } from '../util';
import { Comment } from '../models/comment';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  LOAD_COMMENTS:                    type('[Comment] Load Comments'),
  LOAD_COMMENTS_SUCCESS:            type('[Comment] Load Comments Success'),
  ADD_COMMENT:                      type('[Comment] Add Comment'),
  ADD_COMMENT_SUCCESS:              type('[Comment] Add Comment Success'),
  // SAVE_COMMENT:                     type('[Comment] Save Comment'),
  // SAVE_COMMENT_SUCCESS:             type('[Comment] Save Comment Success'),
  DELETE_COMMENT:                   type('[Comment] Delete Comment'),
  DELETE_COMMENT_SUCCESS:           type('[Comment] Delete Comment Success'),
};


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class LoadCommentsAction implements Action {
  type = ActionTypes.LOAD_COMMENTS;

  constructor(public payload: string) { };
}

export class LoadCommentsSuccessAction implements Action {
  type = ActionTypes.LOAD_COMMENTS_SUCCESS;

  constructor(public payload: Comment[]) { };
}

export class AddCommentAction implements Action {
  type = ActionTypes.ADD_COMMENT;

  constructor(public payload: Comment) { };
}

export class AddCommentSuccessAction implements Action {
  type = ActionTypes.ADD_COMMENT_SUCCESS;

  constructor(public payload: Comment) { };
}

// export class SaveCommentAction implements Action {
//   type = ActionTypes.SAVE_COMMENT;

//   constructor(public payload: Comment) { };
// }

// export class SaveCommentSuccessAction implements Action {
//   type = ActionTypes.SAVE_COMMENT_SUCCESS;

//   constructor() { };
// }

export class DeleteCommentAction implements Action {
  type = ActionTypes.DELETE_COMMENT

  constructor(public payload: Comment){};
}

export class DeleteCommentSuccessAction implements Action {
  type = ActionTypes.DELETE_COMMENT_SUCCESS

  constructor(public payload: string){};
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = LoadCommentsAction
  | LoadCommentsSuccessAction
  | AddCommentAction
  | AddCommentSuccessAction
  // | SaveCommentAction
  // | SaveCommentSuccessAction
  | DeleteCommentAction
  | DeleteCommentSuccessAction
