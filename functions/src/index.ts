import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { EmployeeType, ActivityStatus, getAllowedStatuses } from '../../common/index';

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

const getEmployeeType = (context: functions.https.CallableContext): Promise<EmployeeType> =>
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

const setActivityStatus = async (
  employeeType: EmployeeType,
  activityId: string,
  status: ActivityStatus
) => {
  const activityRef = admin.database().ref(`/activities/${activityId}`);
  const activity = await activityRef.once('value').then((data) => data.val());
  const allowed = getAllowedStatuses(employeeType, activity.status);
  const isAllowed = allowed.some((s) => s === status);
  if (!isAllowed) {
    throw 'Transition not permitted';
  }
  await activityRef.update({ status });
};

export const changeActivityStatus = functions.https.onCall(
  ({ id, status }, context) =>
    new Promise(async (resolve, reject) => {
      try {
        if (!id || !status) {
          throw 'Invalid params';
        }
        const type = await getEmployeeType(context);
        await setActivityStatus(type, id, status);
        resolve({ error: null });
      } catch (error) {
        console.error(error);
        resolve({ error });
      }
    })
);
