import { combineEpics } from 'redux-observable';

import activities from './activities';
import activity from './activity';
import users from './users';

export default combineEpics(...activities, ...activity, ...users);
