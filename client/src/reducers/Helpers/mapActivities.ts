import { ActivityStatus, IActivity } from 'common/index';
import { ICard, IList } from '../../interfaces/TaskLists';

export default (val: { [id: string]: IActivity }): IList[] => {
  const activityListsTypes = new Set<ActivityStatus>();
  const activityLists: IList[] = [];
  const activityCards: ICard[] = [];

  Object.entries(val).map(([key, value]) => {
    const { description, estimation, status, assignee, title } = value;
    activityListsTypes.add(status);
    activityCards.push({ id: key, description, estimation, status, assignee, title });
  });

  const arrayFromSet = Array.from(activityListsTypes).sort((a, b) => a - b);

  arrayFromSet.forEach(it => {
    switch (it) {
      case ActivityStatus.ReadyForAssignment:
        activityLists.push({
          title: 'ready for assign',
          status: it,
          cards: activityCards.filter(activity => activity.status === it),
        });
        break;
      case ActivityStatus.Assigned:
        activityLists.push({
          title: 'assigned',
          status: it,
          cards: activityCards.filter(activity => activity.status === it),
        });
        break;
      case ActivityStatus.InProgress:
        activityLists.push({
          title: 'in progress',
          status: it,
          cards: activityCards.filter(activity => activity.status === it),
        });
        break;
      default:
        break;
    }
  });

  return activityLists;
};
