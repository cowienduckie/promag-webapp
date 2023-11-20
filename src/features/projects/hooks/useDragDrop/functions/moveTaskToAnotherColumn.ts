import { DraggableLocation } from 'react-beautiful-dnd';

import { IKanbanColumn, IKanbanProject } from '../../../types';

export const moveTaskToAnotherColumn = (
  currentState: IKanbanProject,
  draggableId: string,
  source: DraggableLocation,
  destination: DraggableLocation,
  start: IKanbanColumn,
  finish: IKanbanColumn
): IKanbanProject => {
  const startTaskIds = Array.from(start.taskIds);
  startTaskIds.splice(source.index, 1);

  const newStart = {
    ...start,
    taskIds: startTaskIds
  };

  const finishTaskIds = Array.from(finish.taskIds);
  finishTaskIds.splice(destination.index, 0, draggableId);

  const newFinish = {
    ...finish,
    taskIds: finishTaskIds
  };

  return {
    ...currentState,
    columns: {
      ...currentState.columns,
      [start.id]: newStart,
      [finish.id]: newFinish
    },
    tasks: {
      ...currentState.tasks,
      [draggableId]: {
        ...currentState.tasks[draggableId],
        column: finish.id
      }
    }
  };
};
