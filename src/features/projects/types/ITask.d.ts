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

export interface ISimplifiedTask {
  id: string;
  name: string;
  isCompleted: boolean;
  startOn?: Date;
  dueOn?: Date;
  assignee?: string;
}

export interface ITaskSet {
  [key: string]: IKanbanTask;
}
