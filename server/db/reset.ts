import {
  ActivityStatus,
  ActivityType,
  EmployeeId,
  EmployeeType,
  IActivity,
  IEmployee,
} from 'common/index';

import { DB_RESET_CONFIG } from './config';
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
    ref.activities.set({});
    ref.employes.set({});
  }

  writeUsersData(type: EmployeeType, total: number): Promise<any> {
    return new Promise((resolve, reject) =>
      Array.from({ length: total }).forEach(async (j, i) => {
        const result = ref.employes.push();
        try {
          await result.set({
            type,
            email: `employee${i}@crm`,
            password: `crm${i}`,
          });
        } catch (e) {
          reject(e);
        }
        this.ids[type].push(result.key as string);
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
          await ref.activities.push().set({
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
      this.writeUsersData(EmployeeType.Operator, this.config.OPERATORS),
      this.writeUsersData(EmployeeType.Volunteer, this.config.VOLUNTEERS),
    ]).then(() => this.writeActivities(this.config.ACTIVITIES));
  }
}

const db = new DB(DB_RESET_CONFIG);

db.generateData()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
