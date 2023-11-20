import { useContext } from 'react';
import { DropResult } from 'react-beautiful-dnd';

import { ProjectContext } from '../../contexts/project-context';
import { IKanbanProject } from '../../types';

import { moveColumn, moveTaskSameColumn, moveTaskToAnotherColumn } from './functions';

type ReturnType = {
  onDragEnd: (result: DropResult) => void;
  state: IKanbanProject;
};

export const useDragDrop = (): ReturnType => {
  const projectContext = useContext(ProjectContext);

  const onDragEnd = (result: DropResult): void => {
    const { draggableId, source, destination, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    let newState: IKanbanProject;

    if (type === 'column') {
      newState = moveColumn(projectContext.project, draggableId, source, destination);
    } else {
      const start = projectContext.project.columns[source.droppableId];
      const finish = projectContext.project.columns[destination.droppableId];

      if (start === finish) {
        newState = moveTaskSameColumn(
          projectContext.project,
          draggableId,
          source,
          destination,
          start
        );
      } else {
        newState = moveTaskToAnotherColumn(
          projectContext.project,
          draggableId,
          source,
          destination,
          start,
          finish
        );
      }
    }

    projectContext.setProject(newState);
  };

  return { onDragEnd, state: projectContext.project };
};
