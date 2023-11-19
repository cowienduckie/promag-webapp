import clsx from 'clsx';
import { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { StrictModeDroppable } from '@/libs/strict-mode-droppable';

import { IColumn, ITask } from '../../types';
import { Container } from '../Container';
import { AddTaskModal } from '../Modal';
import { Task } from '../Task';
import { TaskList } from '../TaskList';

type ColumnProps = {
  column: IColumn;
  tasks: ITask[];
  index: number;
};

const InnerTaskList = memo(({ tasks }: { tasks: ITask[] }) => (
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
      {(provided) => (
        <Container
          className={clsx('m-5 flex max-h-fit w-1/4 min-w-fit flex-col rounded bg-gray-100 p-5')}
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
                  'flex flex-grow flex-col rounded p-3',
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
