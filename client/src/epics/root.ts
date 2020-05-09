import { combineEpics } from 'redux-observable';

import activities from './activities';
import activitiesDND from './activitiesDND';

export default combineEpics(...activities, ...activitiesDND);
