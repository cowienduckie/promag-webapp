import { Button, Form, Input } from 'antd';

import { ButtonModal } from '@/components/ButtonModal';
import { inviteUserToWorkspace } from '@/features/workspaces/apis';
import { useDisclosure } from '@/hooks/useDisclosure';

type FormValues =
  | {
      email: string;
    }
  | any;

export const InviteWorkspaceModal = ({
  workspaceId,
  onRefreshList
}: {
  workspaceId: string;
  onRefreshList: () => void;
}) => {
  const [form] = Form.useForm();
  const { isOpen, open, close } = useDisclosure(false);

  const onFinishForm = async (values: FormValues) => {
    inviteUserToWorkspace(workspaceId, values.email).finally(() => {
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
      buttonTitle="Invite a friend"
      buttonClassName="w-fit"
      modalTitle="Invite a friend to this workspace"
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
          label="Email Address"
          name="email"
          rules={[{ required: true, message: 'Please input Email address!' }]}
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
