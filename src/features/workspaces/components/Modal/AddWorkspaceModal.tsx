import { Button, Form, Input } from 'antd';

import { ButtonModal } from '@/components/ButtonModal';
import { createWorkspace } from '@/features/workspaces/apis';
import { useDisclosure } from '@/hooks/useDisclosure';

type FormValues =
  | {
      name: string;
    }
  | any;

export const AddWorkspaceModal = ({ onRefreshList }: { onRefreshList: () => void }) => {
  const [form] = Form.useForm();
  const { isOpen, open, close } = useDisclosure(false);

  const onFinishForm = async (values: FormValues) => {
    createWorkspace(values.name).finally(() => {
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
      buttonTitle="New Workspace"
      modalTitle="Create New Workspace"
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
          rules={[{ required: true, message: 'Please input Workspace name!' }]}
        >
          <Input />
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
