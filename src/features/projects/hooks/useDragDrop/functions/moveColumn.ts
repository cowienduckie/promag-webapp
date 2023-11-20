import { DraggableLocation } from 'react-beautiful-dnd';

import { IKanbanProject } from '../../../types';

export const moveColumn = (
  currentState: IKanbanProject,
  draggableId: string,
  source: DraggableLocation,
  destination: DraggableLocation
): IKanbanProject => {
  const newColumnOrder = Array.from(currentState.columnOrder);

  newColumnOrder.splice(source.index, 1);
  newColumnOrder.splice(destination.index, 0, draggableId);

  return {
    ...currentState,
    columnOrder: newColumnOrder
  };
};
