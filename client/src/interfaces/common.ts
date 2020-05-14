import { ActivityStatus, IActivity } from 'common/index';
import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack';

export type ActivityLists = {
  [key in ActivityStatus]: IActivity[];
};

export interface INotification {
  key?: SnackbarKey;
  message: SnackbarMessage;
  options: OptionsObject;
  dismissed?: boolean;
}
