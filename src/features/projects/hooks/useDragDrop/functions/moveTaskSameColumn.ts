import { DraggableLocation } from 'react-beautiful-dnd';

import { IKanbanColumn, IKanbanProject } from '../../../types';

export const moveTaskSameColumn = (
  currentState: IKanbanProject,
  draggableId: string,
  source: DraggableLocation,
  destination: DraggableLocation,
  column: IKanbanColumn
): IKanbanProject => {
  const newTaskIds = Array.from(column.taskIds);

  newTaskIds.splice(source.index, 1);
  newTaskIds.splice(destination.index, 0, draggableId);

  const newColumn = {
    ...column,
    taskIds: newTaskIds
  };

  return {
    ...currentState,
    columns: {
      ...currentState.columns,
      [newColumn.id]: newColumn
    }
  };
};
