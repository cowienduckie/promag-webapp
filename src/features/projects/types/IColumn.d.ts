export interface IKanbanColumn {
  id: string;
  name: string;
  taskIds: string[];
}

export interface IColumnSet {
  [key: string]: IKanbanColumn;
}
