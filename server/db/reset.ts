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
const deleteAllEmployees = () => admin.database().ref(REFS.EMPLOYES).set({});

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

const getUserNameToken = (type: EmployeeType): string => {
  switch (type) {
    case EmployeeType.Admin:
      return 'a';
    case EmployeeType.Operator:
      return 'o';
  }
  return 'v';
};

const createUserAndEmployee = async (user: admin.auth.CreateRequest, type: EmployeeType) => {
  const { uid } = await admin.auth().createUser(user);
  ids[type].push(uid);
  await admin.auth().setCustomUserClaims(uid, { type });
  return await admin
    .database()
    .ref(`${REFS.EMPLOYES}/${uid}`)
    .set({ email: user.email, name: user.displayName, type });
};

const createUsersByType = (type: EmployeeType, total: number): Promise<any> =>
  Promise.all(
    Array.from({ length: total }).map((j, i) => {
      const nameToken = getUserNameToken(type);
      const user: admin.auth.CreateRequest = {
        email: `${nameToken}${i}@crm.crm`,
        emailVerified: true,
        password: `password${i}`,
        displayName: `${nameToken}${i}`,
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
          assignee: getRandomArrayValue(ids[EmployeeType.Volunteer]),
          status: getRandomEnumValue(ActivityStatus),
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