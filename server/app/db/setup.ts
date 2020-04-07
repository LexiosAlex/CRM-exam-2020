import { employeeRef, activitiesRef } from '../firebase';
// import {
//   ActivityStatus,
//   ActivityType,
//   EmployeeType,
//   IActivity,
//   IEmployee,
// } from "common/common";
//path doesn't work

export enum ActivityType {
  Delivery = 0,
  Shopping,
  HomeCare,
  Other,
}

export enum ActivityStatus {
  ReadyForAssignment = 0,
  Assigned,
  InProgress,
  Canceled,
  Done,
  Archived,
}

export enum EmployeeType {
  Admin = 0,
  Operator,
  Volunteer,
}

type Id = string;
type EmployeeId = Id;

interface IActivityHistory {
  // id: Id;
  time: number;
  status: ActivityType;
}

export interface IActivity {
  // id: Id;
  type: ActivityType;
  description: string;
  address: string;
  estimation: number;
  operatorId: EmployeeId; // who created
  assignee: string; // who is assignee
  status: ActivityStatus;
  history: IActivityHistory[];
}

interface IEmployee {
  // id: EmployeeId;
  type: EmployeeType;
  email: string;
  password: string;
}

function randomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = (Object.keys(anEnum)
    .map((n) => Number.parseInt(n))
    .filter((n) => !Number.isNaN(n)) as unknown) as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
}

const writeUsersData = () => {
  const generateEmployee: (type: EmployeeType, count: number) => IEmployee[] = (type, count) => {
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

  const volunteers = generateEmployee(EmployeeType.Volunteer, 5);
  const operators = generateEmployee(EmployeeType.Operator, 2);

  volunteers.concat(operators).map((employee) =>
    employeeRef.push().set({
      type: employee.type,
      email: employee.email,
      password: employee.password,
    })
  );
};

const writeActivities = () => {
  const generateActivities: (count: number) => IActivity[] = (count) => {
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
  generateActivities(15).map((activity) =>
    activitiesRef.push().set({
      type: activity.type,
      description: activity.description,
      address: activity.address,
      estimation: activity.estimation,
      operatorId: activity.operatorId,
      assigne: activity.assignee,
      status: activity.status,
      history: activity.history,
    })
  );
};

writeUsersData();
writeActivities();
