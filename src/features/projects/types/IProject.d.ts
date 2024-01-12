import { IColumnSet } from './IColumn';
import { ITaskSet } from './ITask';

export interface ISimplifiedProject {
  id: string;
  name: string;
  notes?: string;
  createdOn: Date;
  lastModifiedOn?: Date;
  workspaceId: string;
}

export interface ICreateProjectDto {
  name: string;
  notes?: string;
  color?: string;
  dueDate?: Date;
  workspaceId?: string;
}

export interface IKanbanProject {
  id: string;
  name: string;
  notes?: string;
  color: string;
  dueDate?: Date;
  createdOn: Date;
  lastModifiedOn?: Date;
  workspaceId: string;

  tasks: ITaskSet;
  columns: IColumnSet;

  columnOrder: string[];
}
