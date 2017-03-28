import * as notification from '../actions/notification';
import { Toastr } from '../models/toastr';

// this.toasterService.pop('success', 'Args Title', 'Args Body');
export interface State {
  showProgress: boolean;
  notifications: Toastr[];
}

const initialState: State = {
  showProgress: false,
  notifications: []
};

export function reducer(state = initialState, action: notification.Actions): State {
  switch (action.type) {
    case notification.ActionTypes.SHOW_PROGRESS_SUCCESS:
      return Object.assign({}, state, {
        showProgress: true
      });

    case notification.ActionTypes.COMPLETE_PROGRESS_SUCCESS:
      return Object.assign({}, state, {
        showProgress: false
      });

    case notification.ActionTypes.POP_NOTIFICATION_SUCCESS:
      return Object.assign({}, state, {
        notifications: state.notifications.concat(action.payload)
      });

    default:
      return state;
  }
}

export const getProgressStatus = (state: State) => state.showProgress;
export const getNotifications = (state: State) => state.notifications;