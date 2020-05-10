import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';
import { OptionsObject, SnackbarKey } from 'notistack';
import { showNotification, closeNotification } from '../actions/notifier';
import { INotification } from '../interfaces/common';
import { useDispatch } from 'react-redux';

const ErrorButton: React.FC<{ actionKey: SnackbarKey }> = ({ actionKey }) => {
  const dispatch = useDispatch();
  return (
    <IconButton
      onClick={() => {
        dispatch(closeNotification(actionKey));
      }}
    >
      <Close />
    </IconButton>
  );
};

const DEFAULT_OPTIONS: OptionsObject = {
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'center',
  },
  variant: 'error',
  action: (key) => <ErrorButton actionKey={key} />,
};

export const notifyOpt = (notification: INotification) => showNotification(notification);

export const notify = (message: string) =>
  notifyOpt({
    message,
    options: DEFAULT_OPTIONS,
  });
