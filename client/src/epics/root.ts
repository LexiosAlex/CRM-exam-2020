import { combineEpics } from 'redux-observable';

import activities from './activities';
import activity from './activity';
import users from './users';
import activityForm from './activityForm';

export default combineEpics(...activities, ...activity, ...users, ...activityForm);
