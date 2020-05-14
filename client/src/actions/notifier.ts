import { SnackbarKey } from 'notistack';

import { INotification } from '../interfaces/common';
import {
  SHOW_NOTIFICATION,
  CLOSE_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from '../interfaces/actions/notifier';

export const showNotification = (notification: INotification) => ({
  type: SHOW_NOTIFICATION,
  notification: {
    ...notification,
    key: new Date().getTime() + Math.random(),
  },
});

export const closeNotification = (key: SnackbarKey) => ({
  type: CLOSE_NOTIFICATION,
  dismissAll: !key,
  key,
});

export const removeNotification = (key: SnackbarKey) => ({
  type: REMOVE_NOTIFICATION,
  key,
});
