import { ActivityType, ActivityStatus, EmployeeType, IActivity, IEmployee } from 'common/index';

import { employeeRef, activitiesRef } from './config';

function randomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = (Object.keys(anEnum)
    .map((n) => Number.parseInt(n))
    .filter((n) => !Number.isNaN(n)) as unknown) as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
}

const generateEmployee = (type: EmployeeType, count: number): IEmployee[] => {
  const employeeList: IEmployee[] = [];
  for (let i = 0; i < count; i++) {
    employeeList.push({
      type: type,
      email: `email${Date.now()}`,
      password: `password${Date.now()}`,
    });
  }
  return employeeList;
};

const generateActivities = (count: number): IActivity[] => {
  const activitiesList: IActivity[] = [];
  for (let i = 0; i < count; i++) {
    const activity = {
      type: randomEnum(ActivityType),
      description: `description${Math.random() * 100 * i}`,
      address: `address${Math.random() * 100 * i}`,
      estimation: Date.now() + Math.floor(Math.random() * 100),
      operatorId: 'operatorId',
      assignee: 'string',
      status: randomEnum(ActivityStatus),
      history: [],
    };
    activitiesList.push(activity);
  }
  return activitiesList;
};

class DB {
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

  constructor(total: number) {
    this.total = total;
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
}

const COUNT: { [key: string]: number } = {
  OPERATORS: 2,
  VOLUNTEERS: 5,
  ACTIVITIES: 15,
};

const TOTAL: number = Object.keys(COUNT).reduce((acc: number, key: string) => acc + COUNT[key], 0);

const db = new DB(TOTAL);
db.writeUsersData(EmployeeType.Operator, COUNT.OPERATORS);
db.writeUsersData(EmployeeType.Volunteer, COUNT.VOLUNTEERS);
db.writeActivities(COUNT.ACTIVITIES);
