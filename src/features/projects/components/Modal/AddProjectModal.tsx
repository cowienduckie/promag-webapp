import { Button, ColorPicker, DatePicker, DatePickerProps, Form, Input } from 'antd';
import { Color } from 'antd/es/color-picker';
import TextArea from 'antd/es/input/TextArea';
import clsx from 'clsx';

import { ButtonModal } from '@/components/ButtonModal';
import { useDisclosure } from '@/hooks/useDisclosure';

import { createProject } from '../../apis';
import { ICreateProjectDto } from '../../types';

type FormValues =
  | {
      name: string;
      notes?: string;
      color: Color;
      dueDate?: DatePickerProps['value'];
    }
  | any;

export const AddProjectModal = ({ onRefreshList }: { onRefreshList: () => void }) => {
  const [form] = Form.useForm();
  const { isOpen, open, close } = useDisclosure(false);

  const onFinishForm = (values: FormValues) => {
    const newProject: ICreateProjectDto = {
      name: values.name,
      notes: values.notes,
      color: values.color.toHexString(),
      dueDate: values.dueOn
    };

    createProject(newProject).finally(() => {
      form.resetFields();
      close();
      onRefreshList();
    });
  };

  const onFinishFormFailed = (errorInfo: unknown) => {
    alert(`Failed: ${errorInfo}`);
  };

  return (
    <ButtonModal
      isModalOpen={isOpen}
      buttonTitle="Create New Project"
      modalTitle="Create New Project"
      buttonClassName={clsx('')}
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
          rules={[{ required: true, message: 'Please input Project name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Color" name="color">
          <ColorPicker defaultFormat="hex" showText disabledAlpha allowClear />
        </Form.Item>

        <Form.Item label="Due Date" name="dueOn">
          <DatePicker onOk={() => {}} />
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