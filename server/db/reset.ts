import firebase from 'firebase';
import * as admin from 'firebase-admin';

import '../env';
import {
  ActivityStatus,
  ActivityType,
  EmployeeId,
  EmployeeType,
  IActivity,
  IEmployee,
} from 'common/index';

import { firebaseConfig, DB_RESET_CONFIG } from './config';
import { ref } from './connection';

function getRandomEnumValue<T>(anEnum: T): T[keyof T] {
  const enumValues = (Object.keys(anEnum)
    .map((n) => Number.parseInt(n))
    .filter((n) => !Number.isNaN(n)) as unknown) as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
}

function getRandomArrayValue(array: any[]) {
  return array[Math.floor(Math.random() * (array.length - 1))];
}

type DBConfig = { [key: string]: number };

type MappedEnum<T extends PropertyKey> = {
  [key in T]: string[];
};

class DB {
  readonly config: DBConfig;
  private ids: MappedEnum<EmployeeType>;

  constructor(config: DBConfig) {
    this.config = config;
    this.ids = {
      [EmployeeType.Admin]: [],
      [EmployeeType.Operator]: [],
      [EmployeeType.Volunteer]: [],
    };
    ref.activities().set({});
    ref.employes().set({});
  }

  writeUsersData(type: EmployeeType, total: number): Promise<any> {
    return new Promise((resolve, reject) =>
      Array.from({ length: total }).forEach(async (j, i) => {
        let uid = '';
        const token = type === EmployeeType.Volunteer ? 'v' : EmployeeType.Operator ? 'o' : 'a';
        const user = {
          name: `${token}${i}`,
          email: `${token}${i}@crm.crm`,
          password: `password${i}`,
        };
        let currentUser;
        // try to log in
        try {
          await firebase.auth().signInWithEmailAndPassword(user.email, user.password);
          currentUser = firebase.auth().currentUser;
        } catch (e) {
          currentUser = null;
        }
        // remove user if it exists
        if (currentUser) {
          try {
            await currentUser.delete();
          } catch (e) {
            console.log("Can't remove user", user);
            reject(e);
          }
        }
        try {
          // create, login, set profile and log out
          await firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then((result: any) => (uid = result.user.uid))
            .then(() => ref.employes(uid).set({ name: user.name, email: user.email, type }));
        } catch (e) {
          console.log("Can't create user", user);
          reject(e);
        }
        this.ids[type].push(uid);
        if (i + 1 === total) {
          resolve();
        }
      })
    );
  }

  writeActivities(total: number): Promise<any> {
    return new Promise((resolve, reject) =>
      Array.from({ length: total }).forEach(async (j, i) => {
        try {
          await ref
            .activities()
            .push()
            .set({
              type: getRandomEnumValue(ActivityType),
              description: `Activity description ${i}`,
              address: `Activity address ${i}`,
              estimation: Math.floor(Math.random() * Math.floor(11)) + 1,
              operatorId: getRandomArrayValue(this.ids[EmployeeType.Operator]),
              assignee: getRandomArrayValue(this.ids[EmployeeType.Volunteer]),
              status: getRandomEnumValue(ActivityStatus),
              history: [],
            });
        } catch (e) {
          reject(e);
        }
        if (i + 1 === total) {
          resolve();
        }
      })
    );
  }

  generateData(): Promise<any> {
    return Promise.all([
      this.writeUsersData(EmployeeType.Admin, this.config.ADMINS),
      this.writeUsersData(EmployeeType.Operator, this.config.OPERATORS),
      this.writeUsersData(EmployeeType.Volunteer, this.config.VOLUNTEERS),
    ]).then(() => this.writeActivities(this.config.ACTIVITIES));
  }
}

// const db = new DB(DB_RESET_CONFIG);

// db.generateData()
//   .then(() => process.exit(0))
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   });

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: firebaseConfig.databaseURL,
});

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

const createUser = (user: admin.auth.CreateRequest): Promise<any> => admin.auth().createUser(user);

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
      return createUser(user);
    })
  );

const createUsers = () =>
  Promise.all([
    createUsersByType(EmployeeType.Admin, DB_RESET_CONFIG.ADMINS),
    createUsersByType(EmployeeType.Operator, DB_RESET_CONFIG.OPERATORS),
    createUsersByType(EmployeeType.Volunteer, DB_RESET_CONFIG.VOLUNTEERS),
  ]);

const run = async () => {
  try {
    await deleteAllUsers();
    await createUsers();
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

run();
