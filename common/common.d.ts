interface activityChange {
  id: 'string',
  time: number;
  typeBefore: "delivery" | "shopping" | "help" | "other";
  typeAfter: "delivery" | "shopping" | "help" | "other";
}

type activityChanges = activityChange[]

interface Activity {
  id: string;
  type: "delivery" | "shopping" | "help" | "other";
  description: string;
  status:
  | "ready for assigment"
  | "assigned"
  | "in progress"
  | "canceled"
  | "done"
  | "review"
  | "archived";
  assignedTo: string;
  address: string;
  estimation: number;
  timeInProgress: number;
  changes: activityChanges
}

interface Employee {
  id: string;
  rights: 'volunteer' | "operator" | "admin"
}
