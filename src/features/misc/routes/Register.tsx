import { App, Button, Flex, Form, Input, Typography } from 'antd';
import clsx from 'clsx';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Head } from '@/components/Head';
import { AppContext } from '@/contexts/app-context';

import { registerWithEmail } from '../apis/registerApis';
import { RegisterUserInput } from '../types';

type FormValues =
  | {
      name: string;
      notes?: string;
    }
  | any;

export const Register = () => {
  const { authenticated } = useContext(AppContext);
  const navigate = useNavigate();

  if (authenticated) {
    navigate('/app');
  }

  const [form] = Form.useForm();
  const { notification } = App.useApp();

  const onFinishForm = (values: FormValues) => {
    const input: RegisterUserInput = {
      userName: values.userName,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName
    };

    registerWithEmail(input)
      .then(() => {
        form.resetFields();

        notification.success({
          message: 'Account Registration Succeeded!',
          description:
            'Your new account register successfully .Please check your email to verify your account.',
          placement: 'topRight',
          duration: 3
        });

        navigate('/');
      })
      .catch(() => {
        form.resetFields();

        notification.error({
          message: 'Account Registration Failed!',
          description: 'Your new account register failed. Please try again!',
          placement: 'topRight',
          duration: 3
        });

        navigate('/');
      });
  };

  const onFinishFormFailed = (errorInfo: any) => {
    notification.error({
      message: 'Account Registration Failed!',
      description: errorInfo,
      placement: 'topRight',
      duration: 3
    });
  };

  return (
    <div className={clsx('m-auto w-full')}>
      <Head title="Register" description="Register to ProMag" />

      <Flex justify="space-between">
        <img className={clsx('block h-screen')} alt="" src="/juicy-project-management.svg" />
        <div className={clsx('w-full p-16')}>
          <Typography.Title className={'text-center'} level={2}>
            ProMag Registration
          </Typography.Title>
          <Form
            form={form}
            layout={'vertical'}
            onFinish={onFinishForm}
            onFinishFailed={onFinishFormFailed}
            autoComplete="on"
          >
            <Form.Item
              label="User Name"
              name="userName"
              rules={[{ required: true, message: 'Please input User name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email Address"
              name="email"
              rules={[{ required: true, message: 'Please input Email address!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'Please input First name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: 'Please input Last name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item className={clsx('flex flex-row justify-center')}>
              <Link to={'/'}>
                <Button className="mr-2" type="default">
                  Cancel
                </Button>
              </Link>
              <Button className="ml-2" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Flex>
    </div>
  );
};
