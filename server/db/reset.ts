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

function randomEnumValue<T>(anEnum: T): T[keyof T] {
  const enumValues = (Object.keys(anEnum)
    .map((n) => Number.parseInt(n))
    .filter((n) => !Number.isNaN(n)) as unknown) as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
}

const getEmployeesIds = (employeeType: EmployeeType): EmployeeId[] => {
  const employeesIds: EmployeeId[] = [];
  ref.employes
    .orderByChild('type')
    .equalTo(employeeType)
    .on('child_added', (snapshot) => {
      snapshot.key != null && employeesIds.push(snapshot.key);
      // Не уверен по поводу данного решения, но тс пишет, что потенцеальное значение null
    });

  return employeesIds;
};

type DBConfig = { [key: string]: number };

class DB {
  config: DBConfig;
  total: number;
  totalDone: number;

  done = (error: Error | null) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
    if (++this.totalDone === this.total) {
      process.exit(0);
    }
  };

  constructor(config: DBConfig) {
    this.config = config;
    this.total = Object.keys(config).reduce((acc: number, key: string) => acc + config[key], 0);
    this.totalDone = 0;

    ref.activities.set({});
    ref.employes.set({});
  }

  writeUsersData(type: EmployeeType, total: number) {
    Array.from({ length: total }).forEach((j, i) =>
      ref.employes.push().set(
        {
          type,
          email: `employee${i}@crm`,
          password: `crm${i}`,
        },
        this.done
      )
    );
  }

  writeActivities(total: number) {
    const volunteersIds = getEmployeesIds(EmployeeType.Volunteer);
    const operatorsIds = getEmployeesIds(EmployeeType.Operator);
    Array.from({ length: total }).forEach((j, i) =>
      ref.activities.push().set(
        {
          type: randomEnumValue(ActivityType),
          description: `Activity description ${i}`,
          address: `Activity address ${i}`,
          estimation: Math.floor(Math.random() * Math.floor(11)) + 1,
          operatorId: operatorsIds[Math.floor(Math.random() * (operatorsIds.length - 1))],
          assignee: volunteersIds[Math.floor(Math.random() * (volunteersIds.length - 1))],
          status: randomEnumValue(ActivityStatus),
          history: [],
        },
        this.done
      )
    );
  }

  generateData() {
    this.writeUsersData(EmployeeType.Operator, this.config.OPERATORS);
    this.writeUsersData(EmployeeType.Volunteer, this.config.VOLUNTEERS);
    this.writeActivities(this.config.ACTIVITIES);
  }
}

const db = new DB(DB_RESET_CONFIG);

db.generateData();
