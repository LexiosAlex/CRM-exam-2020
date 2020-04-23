import { combineEpics } from 'redux-observable';

import activities from './activities';

export default combineEpics(...activities);
