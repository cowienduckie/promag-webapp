import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { memo, useContext, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { useDisclosure } from '@/hooks/useDisclosure';

import { ProjectContext } from '../../contexts/project-context';
import { IKanbanProject, IKanbanTask } from '../../types';
import { Container } from '../Container';

type TaskProps = {
  task: IKanbanTask;
  index: number;
};

enum Action {
  ViewTask = 'VIEW_TASK',
  EditTask = 'EDIT_TASK'
}

const Task = (props: TaskProps) => {
  const { task, index, ...otherProps } = props;
  const { isOpen, open, close } = useDisclosure(false);
  const projectContext = useContext(ProjectContext);
  const [action, setAction] = useState<Action>(Action.ViewTask);

  const handleDeleteTask = () => {
    const columnId =
      projectContext.project.columnOrder.find((columnId) =>
        projectContext.project.columns[columnId].taskIds.includes(task.id)
      ) ?? '';

    const updatedProject = {
      ...projectContext.project,
      tasks: {
        ...projectContext.project.tasks
      },
      columns: {
        ...projectContext.project.columns,
        [columnId]: {
          ...projectContext.project.columns[columnId],
          taskIds: projectContext.project.columns[columnId].taskIds.filter(
            (taskId) => taskId !== task.id
          )
        }
      }
    };

    projectContext.setProject(updatedProject);
    close();
  };

  const handleEditTask = (values: { name: string; description?: string }) => {
    const updatedProject = {
      ...projectContext.project,
      tasks: {
        ...projectContext.project.tasks,
        [task.id]: {
          ...task,
          name: values.name,
          description: values.description ?? ''
        }
      }
    } as IKanbanProject;

    projectContext.setProject(updatedProject);
  };

  const handleMarkAsCompleted = () => {
    const updatedProject = {
      ...projectContext.project,
      tasks: {
        ...projectContext.project.tasks,
        [task.id]: {
          ...task,
          isCompleted: !task.isCompleted
        }
      }
    } as IKanbanProject;
    projectContext.setProject(updatedProject);
  };

  return (
    <>
      <Draggable draggableId={task.id} index={index} key={task.id} {...otherProps}>
        {(provided, snapshot) => (
          <Container
            className={`my-2 rounded p-4 ${
              snapshot.isDragging ? 'bg-green-100' : task.isCompleted ? 'bg-gray-300' : 'bg-white'
            }`}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
          >
            <p onClick={open}>
              <strong>{task.name}</strong>
            </p>
            <Checkbox className="mt-5" onClick={handleMarkAsCompleted} checked={task.isCompleted}>
              Is Completed?
            </Checkbox>
          </Container>
        )}
      </Draggable>

      <Modal
        title={task.name.toUpperCase()}
        className="p-2"
        open={isOpen}
        onOk={close}
        onCancel={() => {
          setAction(Action.ViewTask);
          close();
        }}
        footer={false}
      >
        {action === Action.ViewTask ? (
          <>
            <p className="mb-2 mt-5">
              <strong>ID: </strong> {task.id}
            </p>
            <p className="my-2">
              <strong>Description:</strong> {task.notes}
            </p>
            <div className="flex flex-row justify-center">
              <Button
                className="mt-5"
                type="primary"
                danger
                onClick={handleDeleteTask}
                icon={<DeleteOutlined className="align-text-top" />}
              >
                Delete
              </Button>
              <Button
                className="ml-5 mt-5 bg-green-500"
                type="primary"
                onClick={() => setAction(Action.EditTask)}
                icon={<EditOutlined className="align-text-top" />}
              >
                Edit
              </Button>
            </div>
          </>
        ) : (
          <>
            <Form
              className="my-5"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              onFinish={handleEditTask}
              autoComplete="off"
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input task name!' }]}
              >
                <Input defaultValue={task.name} />
              </Form.Item>

              <Form.Item label="Description" name="description">
                <TextArea rows={3} defaultValue={task.notes} />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  className="mt-5"
                  type="primary"
                  danger
                  onClick={() => setAction(Action.ViewTask)}
                >
                  Cancel
                </Button>

                <Button
                  className="ml-5 mt-5 bg-green-500"
                  type="primary"
                  onClick={() => {
                    setAction(Action.ViewTask);
                    close();
                  }}
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>
    </>
  );
};

export default memo(Task);
