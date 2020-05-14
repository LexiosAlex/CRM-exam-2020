import { INotification } from '../common';
import { SnackbarKey } from 'notistack';

const prefix: string = 'NOTIFICATIONS';

export const SHOW_NOTIFICATION: string = `${prefix}/SHOW_NOTIFICATION`;
export const CLOSE_NOTIFICATION: string = `${prefix}/CLOSE_NOTIFICATION`;
export const REMOVE_NOTIFICATION: string = `${prefix}/REMOVE_NOTIFICATION`;

export interface showNotification {
  type: typeof SHOW_NOTIFICATION;
  notification: INotification;
}

export interface closeNotification {
  type: typeof CLOSE_NOTIFICATION;
  dismissAll: boolean;
  key: SnackbarKey;
}

export interface removeNotification {
  type: typeof REMOVE_NOTIFICATION;
  key: SnackbarKey;
}

export type notificationActions = showNotification | closeNotification | removeNotification;
