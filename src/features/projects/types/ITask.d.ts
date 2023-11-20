export interface IKanbanTask {
  id: string;
  name: string;
  notes?: string;
  isCompleted: boolean;
  completedOn?: Date;
  completedBy?: string;
  startOn?: Date;
  dueOn?: Date;
  liked: boolean;
  likesCount: number;
  assignee?: string;

  column: string;
}

export interface ITaskSet {
  [key: string]: IKanbanTask;
}
