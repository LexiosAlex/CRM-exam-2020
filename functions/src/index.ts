import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { resolve } from 'path';
import { config } from 'dotenv';

import { EmployeeType, ActivityStatus } from '../../common/index';

config({ path: resolve(__dirname, '../../../../.env') });
const isDev = process.env.DEV === 'true';

admin.initializeApp();

export const processSignUp = functions.auth.user().onCreate(async ({ uid }) => {
  try {
    const { customClaims } = await admin.auth().getUser(uid);
    if (customClaims && customClaims.type !== void 0) {
      return; // do not change claims if set
    }
    const type = EmployeeType.Volunteer;
    await admin.auth().setCustomUserClaims(uid, { type });
    await admin.database().ref(`employees/${uid}`).update({ type });
  } catch (e) {
    console.error(e);
    return;
  }
});

const getEmployeeType = (context: functions.EventContext): Promise<EmployeeType> =>
  new Promise(async (resolve, reject) => {
    if (!context.auth) {
      return reject('Not signed in');
    }
    try {
      const type = await admin
        .auth()
        .getUser((context.auth as any).uid)
        .then(({ customClaims }) => resolve((customClaims as any).type));
      if (type !== void 0) {
        resolve(type as any);
      } else {
        reject('Employee type error (1)');
      }
    } catch (e) {
      console.error(e);
      reject('Employee type error (2)');
    }
  });

export const processAssignment = functions.database
  .ref('/activities/{activityId}/status')
  .onUpdate(async (change, context) => {
    try {
      const activityRef = change.after.ref.parent as admin.database.Reference;
      const activity = (await activityRef.once('value')).val();
      const { status, assignee } = activity;
      let type, uid;
      if (isDev) {
        type = EmployeeType.Volunteer;
        uid = 'mtUCkrkOz0XjENgUDmaMsYNq0j92';
      } else {
        type = await getEmployeeType(context);
        uid = (context.auth as any).uid;
      }
      if (
        !!assignee &&
        (status === ActivityStatus.New || status === ActivityStatus.ReadyForAssignment)
      ) {
        activityRef.update({ assignee: null });
      }
      if (status === ActivityStatus.Assigned && type === EmployeeType.Volunteer) {
        const employee = (await admin.database().ref(`employees/${uid}`).once('value')).val();
        const { name } = employee;
        activityRef.child('assignee').update({ id: uid, name });
      }
    } catch (e) {
      console.error(e);
    }
  });
