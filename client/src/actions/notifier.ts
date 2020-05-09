import { SnackbarKey } from 'notistack';

import { INotification } from '../interfaces/common';
import {
  SHOW_NOTIFICATION,
  CLOSE_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from '../interfaces/actions/notifier';

export const showNotification = (notification: INotification) => {
  const key = notification.options && notification.options.key;

  return {
    type: SHOW_NOTIFICATION,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random(),
    },
  };
};

export const closeNotification = (key: SnackbarKey) => {
  return {
    type: CLOSE_NOTIFICATION,
    dismissAll: !key,
    key,
  };
};

export const removeNotification = (key: SnackbarKey) => ({
  type: REMOVE_NOTIFICATION,
  key,
});
