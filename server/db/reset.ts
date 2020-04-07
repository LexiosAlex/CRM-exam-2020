import {
  ActivityStatus,
  ActivityType,
  EmployeeId,
  EmployeeType,
  IActivity,
  IEmployee,
} from 'common/index';

import { activitiesRef, DB_RESET_CONFIG, employeeRef } from './config';

function randomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = (Object.keys(anEnum)
    .map((n) => Number.parseInt(n))
    .filter((n) => !Number.isNaN(n)) as unknown) as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
}

const getEmployeesIds = (employeeType: EmployeeType): EmployeeId[] => {
  const employeesIds: EmployeeId[] = [];
  employeeRef
    .orderByChild('type')
    .equalTo(employeeType)
    .on('child_added', (snapshot) => {
      snapshot.key != null && employeesIds.push(snapshot.key);
      // Не уверен по поводу данного решения, но тс пишет, что потенцеальное значение null
    });

  return employeesIds;
};

const generateEmployee = (type: EmployeeType, count: number): IEmployee[] => {
  const employeeList: IEmployee[] = [];
  for (let i = 0; i < count; i++) {
    employeeList.push({
      type: type,
      email: `employee${i}@crm`,
      password: `crm${i}`,
    });
  }
  return employeeList;
};

const generateActivities = (count: number): IActivity[] => {
  const activitiesList: IActivity[] = [];
  const volunteersIds = getEmployeesIds(EmployeeType.Volunteer);
  const operatorsIds = getEmployeesIds(EmployeeType.Operator);

  for (let i = 0; i < count; i++) {
    const activity = {
      type: randomEnum(ActivityType),
      description: `Activity description ${i}`,
      address: `Activity address ${i}`,
      estimation: Math.floor(Math.random() * Math.floor(11)) + 1,
      operatorId: operatorsIds[Math.floor(Math.random() * (operatorsIds.length - 1))],
      assignee: volunteersIds[Math.floor(Math.random() * (volunteersIds.length - 1))],
      status: randomEnum(ActivityStatus),
      history: [],
    };
    activitiesList.push(activity);
  }
  return activitiesList;
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

    activitiesRef.set({});
    employeeRef.set({});
  }

  writeUsersData(type: EmployeeType, total: number) {
    generateEmployee(type, total).map((employee) =>
      employeeRef.push().set(
        {
          type: employee.type,
          email: employee.email,
          password: employee.password,
        },
        this.done
      )
    );
  }

  writeActivities(total: number) {
    generateActivities(total).map((activity) =>
      activitiesRef.push().set(
        {
          type: activity.type,
          description: activity.description,
          address: activity.address,
          estimation: activity.estimation,
          operatorId: activity.operatorId,
          assignee: activity.assignee,
          status: activity.status,
          history: activity.history,
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
