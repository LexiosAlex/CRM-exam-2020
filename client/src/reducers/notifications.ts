import {
  REMOVE_NOTIFICATION,
  CLOSE_NOTIFICATION,
  SHOW_NOTIFICATION,
} from '../interfaces/actions/notifier';

const defaultState = {
  notifications: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            key: action.key,
            ...action.notification,
          },
        ],
      };

    case CLOSE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.map((notification: any) =>
          action.dismissAll || notification.key === action.key
            ? { ...notification, dismissed: true }
            : { ...notification }
        ),
      };

    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification: any) => notification.key !== action.key
        ),
      };

    default:
      return state;
  }
};
