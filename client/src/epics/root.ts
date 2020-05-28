import { combineEpics } from 'redux-observable';

import activities from './activities';
import activity from './activity';
import users from './users';
import activityForm from './activityForm';
import usersTable from './usersTable';

export default combineEpics(...activities, ...activity, ...users, ...activityForm, ...usersTable);
