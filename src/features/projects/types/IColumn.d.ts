export interface IColumn {
  id: string;
  name: string;
  taskIds: string[];
}

export interface IColumnSet {
  [key: string]: IColumn;
}
