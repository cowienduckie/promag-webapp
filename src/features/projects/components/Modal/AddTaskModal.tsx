import { Button, Checkbox, DatePicker, DatePickerProps, Form, Input } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import TextArea from 'antd/es/input/TextArea';
import { useContext, useState } from 'react';

import { ButtonModal } from '@/components/ButtonModal';
import { useDisclosure } from '@/hooks/useDisclosure';

import { ProjectContext } from '../../contexts/project-context';
import { IKanbanColumn, IKanbanTask } from '../../types';

const { RangePicker } = DatePicker;

type FormValues =
  | {
      name: string;
      notes?: string;
      dueOn?: DatePickerProps['value'];
      dateRange?: RangePickerProps['value'];
    }
  | any;

export const AddTaskModal = ({ column }: { column: IKanbanColumn }) => {
  const projectContext = useContext(ProjectContext);

  const [form] = Form.useForm();
  const { isOpen, open, close } = useDisclosure(false);
  const [startDateIncluded, setStartDateIncluded] = useState(false);

  const onFinishForm = (values: FormValues) => {
    const newTask: IKanbanTask = {
      id: 'newId',
      name: values.name,
      notes: values.notes,

      startOn: startDateIncluded ? values.dateRange[0] : undefined,
      dueOn: startDateIncluded ? values.dateRange[1] : values.dueOn,

      column: column.id,

      isCompleted: false,
      liked: false,
      likesCount: 0
    };

    projectContext.addTask(newTask, projectContext.project.id);
    form.resetFields();
    close();
  };

  const onFinishFormFailed = (errorInfo: unknown) => {
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
        form={form}
        className="my-5"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinishForm}
        onFinishFailed={onFinishFormFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input Task name!' }]}
        >
          <Input />
        </Form.Item>

        {startDateIncluded ? (
          <Form.Item label="Date Range" name="dateRange">
            <RangePicker onOk={() => {}} />
          </Form.Item>
        ) : (
          <Form.Item label="Due Date" name="dueOn">
            <DatePicker onOk={() => {}} />
          </Form.Item>
        )}

        <Form.Item label="Start Date?">
          <Checkbox
            onChange={(e) => {
              setStartDateIncluded(e.target.checked);
            }}
          />
        </Form.Item>

        <Form.Item label="Notes" name="notes">
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button className="mr-2" type="default" onClick={close}>
            Cancel
          </Button>
          <Button className="ml-2" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </ButtonModal>
  );
};
