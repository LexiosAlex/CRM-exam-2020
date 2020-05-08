import { ActivityStatus, EmployeeType } from './index';
import { VISIBLE_STATUSES } from 'src/utils/activities';

const checkVolunteerTransition = (start: ActivityStatus, end: ActivityStatus): boolean => {
  switch (start) {
    case ActivityStatus.ReadyForAssignment:
      return end === ActivityStatus.Assigned;
    case ActivityStatus.Assigned:
      return end === ActivityStatus.ReadyForAssignment || end === ActivityStatus.InProgress;
    case ActivityStatus.InProgress:
      return end === ActivityStatus.Done || end === ActivityStatus.Canceled;
  }
  return false;
};

export const getAllowedStatuses = (
  userType: EmployeeType,
  startStatus: ActivityStatus
): ActivityStatus[] => {
  if (userType === EmployeeType.Operator || EmployeeType.Admin) {
    return VISIBLE_STATUSES[userType];
  }

  if (userType === EmployeeType.Volunteer) {
    return VISIBLE_STATUSES[userType].filter((status) =>
      checkVolunteerTransition(startStatus, status)
    );
  }

  return [];
};
