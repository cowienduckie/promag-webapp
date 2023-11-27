import { IColumnSet } from './IColumn';
import { ITaskSet } from './ITask';

export interface ISimplifiedProject {
  id: string;
  name: string;
  notes?: string;
  createdOn: Date;
  lastModifiedOn?: Date;
}

export interface ICreateProjectDto {
  name: string;
  notes?: string;
  color?: string;
  dueDate?: Date;
}

export interface IKanbanProject {
  id: string;
  name: string;
  notes?: string;
  color: string;
  dueDate?: Date;
  createdOn: Date;
  lastModifiedOn?: Date;

  tasks: ITaskSet;
  columns: IColumnSet;

  columnOrder: string[];
}
