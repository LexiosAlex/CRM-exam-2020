import { OptionsObject } from 'notistack';
import { showNotification } from '../actions/notifier';
import { INotification } from '../interfaces/common';

const DEFAULT_OPTIONS: OptionsObject = {
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'center',
  },
  variant: 'error',
};

export const notifyOpt = (notification: INotification) => showNotification(notification);

export const notify = (message: string) =>
  notifyOpt({
    message,
    options: DEFAULT_OPTIONS,
  });
