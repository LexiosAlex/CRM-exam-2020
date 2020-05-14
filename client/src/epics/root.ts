import { combineEpics } from 'redux-observable';

import activities from './activities';
import activity from './activity';

export default combineEpics(...activities, ...activity);
