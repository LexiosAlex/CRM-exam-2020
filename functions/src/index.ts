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
  // // Update real-time database to notify client to force refresh.
  // const metadataRef = admin.database().ref('metadata/' + uid);
  // // Set the refresh time to the current UTC timestamp.
  // // This will be captured on the client to force a token refresh.
  // return metadataRef.set({ refreshTime: new Date().getTime() });
});
