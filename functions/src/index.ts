import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { resolve } from 'path';
import { config } from 'dotenv';

import { EmployeeType, ActivityStatus, IUser } from '../../common/index';

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

const updateHistory = (
  activityRef: admin.database.Reference,
  status: ActivityStatus,
  assignee: IUser | null,
  operator?: IUser
) => {
  const historyRef = activityRef.child('/history') as admin.database.Reference;
  const newHistoryRecordRef = historyRef.push();
  const time = Date.now();
  return newHistoryRecordRef.set({
    status,
    ...(operator ? { operator } : {}),
    ...(assignee ? { assignee } : {}),
    time,
  });
};

const updateAssignee = async (
  activityRef: admin.database.Reference,
  status: ActivityStatus,
  type: EmployeeType,
  uid: string,
  assignee?: IUser
): Promise<IUser | null> => {
  let user: IUser | null = assignee || null;
  if (!user && status === ActivityStatus.Assigned && type === EmployeeType.Volunteer) {
    // set assignee if Volunteer had moved Activity to Assigned status
    const { name } = (await admin.database().ref(`employees/${uid}`).once('value')).val();
    user = { id: uid, name };
    await activityRef.child('assignee').update(user);
  } else if (
    !!user &&
    (status === ActivityStatus.New || status === ActivityStatus.ReadyForAssignment)
  ) {
    // reset assignee if assigned Activity had been moved to New or Ready status
    user = null;
    activityRef.update({ assignee: user });
  }
  return Promise.resolve(user);
};

export const processCreateActivity = functions.database
  .ref('/activities/{activityId}')
  .onCreate(async (snapshot, context) => {
    try {
      const activityRef = snapshot.ref as admin.database.Reference;
      const activity = snapshot.val();
      const { status, assignee, operator } = activity;
      await updateHistory(activityRef, status, assignee, operator);
    } catch (e) {
      console.error(e);
    }
  });

export const processActivityStatusChange = functions.database
  .ref('/activities/{activityId}/status')
  .onUpdate(async (change, context) => {
    try {
      const activityRef = change.after.ref.parent as admin.database.Reference;
      const activity = (await activityRef.once('value')).val();
      const { status, operator, assignee } = activity;
      let type, uid;
      if (isDev) {
        type = EmployeeType.Volunteer;
        uid = 'u78A8pMgl0WrkitrcyabUS4RML02';
      } else {
        type = await getEmployeeType(context);
        uid = (context.auth as any).uid;
      }
      const _assignee = await updateAssignee(activityRef, status, type, uid, assignee);
      await updateHistory(activityRef, status, _assignee, operator);
    } catch (e) {
      console.error(e);
    }
  });
