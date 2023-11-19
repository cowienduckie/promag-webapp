export interface ITask {
  id: string;
  name: string;
  notes?: string;
  isCompleted: boolean;
  completedOn?: Date;
  completedBy?: string;
  startedOn?: Date;
  dueOn?: Date;
  liked: boolean;
  likesCount: number;
  assignee?: string;

  column: string;
}

export interface ITaskSet {
  [key: string]: ITask;
}
