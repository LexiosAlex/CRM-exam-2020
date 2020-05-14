import {
  REMOVE_NOTIFICATION,
  CLOSE_NOTIFICATION,
  SHOW_NOTIFICATION,
} from '../interfaces/actions/notifier';
import { INotificationsState } from '../interfaces/state';

const defaultState: INotificationsState = {
  list: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        list: [
          ...state.list,
          {
            key: action.key,
            ...action.notification,
          },
        ],
      };

    case CLOSE_NOTIFICATION:
      return {
        ...state,
        list: state.list.map((item) =>
          action.dismissAll || item.key === action.key ? { ...item, dismissed: true } : item
        ),
      };

    case REMOVE_NOTIFICATION:
      return {
        ...state,
        list: state.list.filter((item) => item.key !== action.key),
      };

    default:
      return state;
  }
};
