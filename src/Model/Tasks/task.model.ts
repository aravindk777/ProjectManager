export class Task {
  TaskId: number;
  TaskName: string;
  ParentTaskId: number;
  Priority: Number;
  StartDate: Date;
  EndDate: Date;
  Status: string;
}

export enum StatusType {
  'Not Started' = 0,
  'In Progress' = 1,
  'Pending',
  'Completed'
}
