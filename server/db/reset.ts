import * as admin from 'firebase-admin';

import '../env';
import { ActivityStatus, ActivityType, EmployeeType } from 'common/index';
import { firebaseConfig, DB_RESET_CONFIG, REFS } from './config';

const getRandomEnumValue = <T>(anEnum: T): T[keyof T] => {
  const enumValues = (Object.keys(anEnum)
    .map((n) => Number.parseInt(n))
    .filter((n) => !Number.isNaN(n)) as unknown) as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
};

const getRandomArrayValue = (array: any[]) => array[Math.floor(Math.random() * (array.length - 1))];

type DBConfig = { [key: string]: number };

type MappedEnum<T extends PropertyKey> = {
  [key in T]: string[];
};

const ids: MappedEnum<EmployeeType> = {
  [EmployeeType.Admin]: [],
  [EmployeeType.Operator]: [],
  [EmployeeType.Volunteer]: [],
};

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: firebaseConfig.databaseURL,
});

const deleteAllActivities = () => admin.database().ref(REFS.ACTIVITIES).set({});
const deleteAllEmployees = () => admin.database().ref(REFS.EMPLOYEES).set({});

const deleteAllUsers = (pageToken?: string): Promise<any> =>
  admin
    .auth()
    .listUsers(100, pageToken)
    .then(({ pageToken: token, users }) => {
      console.log(`Removing of ${users.length} users`);
      return Promise.all(
        users.map(({ uid }) => {
          console.log('Removing user', uid);
          return admin.auth().deleteUser(uid);
        })
      ).then(() => (token ? deleteAllUsers(token) : true));
    });

const getUserEmail = (type: EmployeeType, number: number): string => {
  switch (type) {
    case EmployeeType.Admin:
      return `a${number}@crm.crm`;
    case EmployeeType.Operator:
      return `o${number}@crm.crm`;
  }
  return `v${number}@crm.crm`;
};
const getUserName = (type: EmployeeType, number: number): string => {
  switch (type) {
    case EmployeeType.Admin:
      return 'admin' + number;
    case EmployeeType.Operator:
      return 'operator' + +number;
  }
  return 'volunteer' + number;
};

const createUserAndEmployee = async (user: admin.auth.CreateRequest, type: EmployeeType) => {
  const { uid } = await admin.auth().createUser(user);
  ids[type].push(uid);
  await admin.auth().setCustomUserClaims(uid, { type });
  return await admin
    .database()
    .ref(`${REFS.EMPLOYEES}/${uid}`)
    .set({ email: user.email, name: user.displayName, type });
};

const createUsersByType = (type: EmployeeType, total: number): Promise<any> =>
  Promise.all(
    Array.from({ length: total }).map((j, i) => {
      const user: admin.auth.CreateRequest = {
        email: getUserEmail(type, i),
        emailVerified: true,
        password: `password${i}`,
        displayName: getUserName(type, i),
        disabled: false,
      };
      console.log('Creating user', user.email);
      return createUserAndEmployee(user, type);
    })
  );

const createUsers = () =>
  Promise.all([
    createUsersByType(EmployeeType.Admin, DB_RESET_CONFIG.ADMINS),
    createUsersByType(EmployeeType.Operator, DB_RESET_CONFIG.OPERATORS),
    createUsersByType(EmployeeType.Volunteer, DB_RESET_CONFIG.VOLUNTEERS),
  ]);

const createActivities = () => {
  console.log(`Creating of ${DB_RESET_CONFIG.ACTIVITIES} activities`);
  return Promise.all(
    Array.from({ length: DB_RESET_CONFIG.ACTIVITIES }).map(async (j, i) => {
      const status = // let the first Activity to be unassigned
        i === 0 ? ActivityStatus.ReadyForAssignment : getRandomEnumValue(ActivityStatus);
      const assignee = // first two statuses mean no assignee
        status !== ActivityStatus.ReadyForAssignment && status !== ActivityStatus.New
          ? getRandomArrayValue(ids[EmployeeType.Volunteer])
          : null;
      await admin
        .database()
        .ref(`${REFS.ACTIVITIES}`)
        .push()
        .set({
          type: getRandomEnumValue(ActivityType),
          description: `Activity description ${i}`,
          address: `Activity address ${i}`,
          estimation: Math.floor(Math.random() * Math.floor(11)) + 1,
          operator: getRandomArrayValue(ids[EmployeeType.Operator]),
          status,
          assignee,
          history: [],
        });
    })
  );
};

const run = async () => {
  try {
    await deleteAllActivities();
    await deleteAllEmployees();
    await deleteAllUsers();
    await createUsers();
    await createActivities();
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

run();
