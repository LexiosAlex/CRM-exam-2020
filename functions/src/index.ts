import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { EmployeeType } from '../../common/index';

admin.initializeApp();

export const processSignUp = functions.auth.user().onCreate(async ({ uid }) => {
  try {
    const { customClaims, email } = await admin.auth().getUser(uid);
    if (customClaims && customClaims.type !== void 0) {
      return; // do not change claims if set
    }
    const type = EmployeeType.Volunteer;
    await admin.auth().setCustomUserClaims(uid, { type });
    await admin.database().ref(`employees/${uid}`).update({ type, email });
  } catch (e) {
    console.error(e);
    return;
  }
});
