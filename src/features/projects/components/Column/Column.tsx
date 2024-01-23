import clsx from 'clsx';
import { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { StrictModeDroppable } from '@/libs/strict-mode-droppable';

import { IKanbanColumn, IKanbanTask } from '../../types';
import { Container } from '../Container';
import { AddTaskModal } from '../Modal';
import { Task } from '../Task';
import { TaskList } from '../TaskList';

type ColumnProps = {
  column: IKanbanColumn;
  tasks: IKanbanTask[];
  index: number;
};

const InnerTaskList = memo(({ tasks }: { tasks: IKanbanTask[] }) => (
  <>
    {tasks.map((task, index) => (
      <Task key={task.id} task={task} index={index} />
    ))}
  </>
));

const Column = (props: ColumnProps) => {
  const { column, tasks, index } = props;

  return (
    <Draggable key={column.id} draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <Container
          className={clsx(
            'mx-5 my-2 flex h-full w-1/3 flex-col rounded bg-gray-100 p-5',
            snapshot.isDragging ? 'max-h-fit max-w-md' : ''
          )}
          innerRef={provided.innerRef}
          {...provided.draggableProps}
        >
          <h1 className={clsx('mb-3 text-2xl font-bold')} {...provided.dragHandleProps}>
            {column.name}
          </h1>
          <StrictModeDroppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                className={clsx(
                  'flex h-full flex-col overflow-auto rounded p-3',
                  snapshot.isDraggingOver ? 'bg-gray-400' : ''
                )}
                innerRef={provided.innerRef}
                {...provided.droppableProps}
              >
                <InnerTaskList tasks={tasks} />
                {provided.placeholder}
              </TaskList>
            )}
          </StrictModeDroppable>
          <AddTaskModal column={column} />
        </Container>
      )}
    </Draggable>
  );
};

export default memo(Column);
