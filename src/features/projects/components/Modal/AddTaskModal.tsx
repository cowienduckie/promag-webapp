import { Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useContext } from 'react';

import { ButtonModal } from '@/components/ButtonModal';
import { useDisclosure } from '@/hooks/useDisclosure';

import { ProjectContext } from '../../contexts/project-context';
import { IColumn, IProject } from '../../types';

export const AddTaskModal = ({ column }: { column: IColumn }) => {
  const { isOpen, open, close } = useDisclosure(false);
  const projectContext = useContext(ProjectContext);

  const onFinish = (values: { name: string; description?: string }) => {
    const newId: string = 'Task-' + (Object.keys(projectContext.project.tasks).length + 1);

    projectContext.project.columns[column.id].taskIds.push(newId);

    const updatedProject = {
      ...projectContext.project,
      tasks: {
        ...projectContext.project.tasks,
        [newId]: {
          id: newId,
          name: values.name,
          description: values.description ?? '',
          column: column.id
        }
      },
      columns: {
        ...projectContext.project.columns
      }
    } as IProject;

    projectContext.setProject(updatedProject);

    close();
  };

  const onFinishFailed = (errorInfo: unknown) => {
    alert(`Failed: ${errorInfo}`);
  };

  return (
    <ButtonModal
      isModalOpen={isOpen}
      buttonTitle="Add Task"
      modalTitle="Add New Task"
      buttonClassName="mt-5"
      handleOpen={open}
      handleCancel={close}
      footer={false}
    >
      <Form
        className="my-5"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input Task name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button className="mr-2" type="primary" htmlType="submit">
            Submit
          </Button>
          <Button className="ml-2" type="default" onClick={close}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </ButtonModal>
  );
};
