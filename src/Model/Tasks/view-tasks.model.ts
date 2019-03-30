export class ViewTasks {
  TaskId: number;
  TaskName: string;
  ParentTaskName: string;
  ParentTaskId: number;
  Priority: number;
  OwnerFullName: string;
  TaskOwnerId: string;
  ProjectName: string;
  ProjectId: number;
  StartDate: Date;
  EndDate: Date;
  IsActive: boolean;
  IsParent: boolean;
}
