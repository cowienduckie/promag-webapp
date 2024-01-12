import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Checkbox, DatePicker, DatePickerProps, Form, Input, Modal, Select } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { memo, useContext, useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { useDisclosure } from '@/hooks/useDisclosure';

import { ProjectContext } from '../../contexts/project-context';
import { IKanbanProject, IKanbanTask } from '../../types';
import { Container } from '../Container';

const { RangePicker } = DatePicker;

type TaskProps = {
  task: IKanbanTask;
  index: number;
};

enum Action {
  ViewTask = 'VIEW_TASK',
  EditTask = 'EDIT_TASK'
}

type FormValues =
  | {
      name: string;
      notes?: string;
      dueOn?: DatePickerProps['value'];
      dateRange?: RangePickerProps['value'];
      isCompleted: boolean;
      assignee?: string;
    }
  | any;

const Task = (props: TaskProps) => {
  const { task, index, ...otherProps } = props;
  const [form] = Form.useForm();
  const { isOpen, open, close } = useDisclosure(false);
  const projectContext = useContext(ProjectContext);
  const [action, setAction] = useState<Action>(Action.ViewTask);
  const [startDateIncluded, setStartDateIncluded] = useState(
    task.startOn !== undefined && task.startOn !== null
  );

  useEffect(() => {
    setStartDateIncluded(task.startOn !== undefined && task.startOn !== null);
  }, []);

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

  const handleEditTask = (values: FormValues) => {
    const updateTask: IKanbanTask = {
      ...task,
      name: values.name,
      notes: values.notes,
      startOn: startDateIncluded ? values.dateRange[0] : undefined,
      dueOn: startDateIncluded ? values.dateRange[1] : values.dueOn,
      isCompleted: values.isCompleted,
      assignee: values.assignee
    };

    projectContext.updateTask(updateTask, projectContext.project.id);
    setAction(Action.ViewTask);
    close();
  };

  const handleMarkAsCompleted = () => {
    const updatedProject = {
      ...projectContext.project,
      tasks: {
        ...projectContext.project.tasks,
        [task.id]: {
          ...task,
          isCompleted: task.isCompleted ? false : true
        }
      }
    } as IKanbanProject;
    projectContext.setProject(updatedProject);
  };

  const filterOption = (
    input: string,
    option?: {
      label: string;
      value: string;
    }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

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
            <p className="mt-5">
              {task.assignee == ''
                ? 'Not yet assigned'
                : projectContext.workspace.members.find((mem) => mem.id == task.assignee)?.email}
            </p>
            <Checkbox className="mt-3" onClick={handleMarkAsCompleted} checked={task.isCompleted}>
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
              form={form}
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
                initialValue={task.name}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Is Completed?"
                name="isCompleted"
                initialValue={task.isCompleted}
                valuePropName="checked"
              >
                <Checkbox />
              </Form.Item>

              <Form.Item label="Assignee" name="assignee" initialValue={task.assignee}>
                <Select
                  showSearch
                  placeholder="Select a assignee"
                  optionFilterProp="children"
                  filterOption={filterOption}
                  options={projectContext.workspace.members.map((member) => ({
                    label: member.email,
                    value: member.id
                  }))}
                />
              </Form.Item>

              {startDateIncluded ? (
                <Form.Item
                  label="Date Range"
                  name="dateRange"
                  initialValue={[
                    task.startOn ? dayjs(task.startOn) : dayjs(),
                    task.dueOn ? dayjs(task.dueOn) : dayjs()
                  ]}
                >
                  <RangePicker onOk={() => {}} />
                </Form.Item>
              ) : (
                <Form.Item
                  label="Due Date"
                  name="dueOn"
                  initialValue={task.dueOn ? dayjs(task.dueOn) : dayjs()}
                >
                  <DatePicker onOk={() => {}} />
                </Form.Item>
              )}

              <Form.Item label="Start Date?">
                <Checkbox
                  defaultChecked={startDateIncluded}
                  onChange={(e) => {
                    setStartDateIncluded(e.target.checked);
                  }}
                />
              </Form.Item>

              <Form.Item label="Notes" name="notes" initialValue={task.notes}>
                <TextArea rows={3} />
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

                <Button className="ml-5 mt-5 bg-green-500" type="primary" htmlType="submit">
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
