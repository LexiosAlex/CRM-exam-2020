import { ActivityStatus, EmployeeType } from './index';

export const getDropPermissions = (userType: EmployeeType, draggableStatus: ActivityStatus) => {
  if (userType === EmployeeType.Operator || EmployeeType.Admin) {
    return Object.values(ActivityStatus).filter((it) => typeof it === 'number');
  }

  if (userType === EmployeeType.Volunteer) {
    return (
      (draggableStatus === ActivityStatus.ReadyForAssignment && [ActivityStatus.Assigned]) ||
      (draggableStatus === ActivityStatus.Assigned && [
        ActivityStatus.InProgress,
        ActivityStatus.ReadyForAssignment,
      ]) ||
      (draggableStatus === ActivityStatus.InProgress && [
        ActivityStatus.Done,
        ActivityStatus.Canceled,
      ]) ||
      (draggableStatus === ActivityStatus.Canceled && ActivityStatus.Done && [])
    );
  }

  return [];
};
