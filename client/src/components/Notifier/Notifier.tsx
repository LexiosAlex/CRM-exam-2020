import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar, SnackbarKey } from 'notistack';

import { removeNotification } from '../../actions/notifier';
import { AppState } from '../../reducers/rootReducer';
import { INotification } from '../../interfaces/common';

let displayed: SnackbarKey[] = [];

export const Notifier = () => {
  const dispatch = useDispatch();
  const notifications: INotification[] = useSelector(
    (store: AppState) => store.notifications.list || [],
  );
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id) => {
    displayed = [...displayed.filter((key) => id !== key)];
  };

  React.useEffect(() => {
    notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
      if (dismissed) {
        closeSnackbar(key);
        return;
      }

      if (key && displayed.includes(key)) {
        return;
      }

      enqueueSnackbar(message, {
        key,
        ...options,
        onClose: (event, reason, myKey) => {
          if (options.onClose) {
            options.onClose(event, reason, myKey);
          }
        },
        onExited: (event, myKey) => {
          dispatch(removeNotification(myKey));
          removeDisplayed(myKey);
        },
      });

      storeDisplayed(key);
    });
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);

  return null;
};
