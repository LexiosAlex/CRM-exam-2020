import { combineEpics } from 'redux-observable';

import activities from './activities';
import activitiesDND from './activity';

export default combineEpics(...activities, ...activitiesDND);
