import { DraggableLocation } from 'react-beautiful-dnd';

import { IProject } from '../../../types';

export const moveColumn = (
  currentState: IProject,
  draggableId: string,
  source: DraggableLocation,
  destination: DraggableLocation
): IProject => {
  const newColumnOrder = Array.from(currentState.columnOrder);

  newColumnOrder.splice(source.index, 1);
  newColumnOrder.splice(destination.index, 0, draggableId);

  return {
    ...currentState,
    columnOrder: newColumnOrder
  };
};
