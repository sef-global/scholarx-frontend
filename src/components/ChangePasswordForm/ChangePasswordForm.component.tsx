import React from 'react';
import { Button, Form, Input, message } from 'antd';

interface ChangePasswordFormProps {
  onSubmit: (props: {
    current_password: string;
    new_password: string;
    confirm_new_password: string;
  }) => void;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  onSubmit,
}) => {
  return (
    <Form
      name="change_password"
      layout="vertical"
      initialValues={{ remember: true }}
      wrapperCol={{ span: 14 }}
      autoComplete="off"
    >
      <Form.Item<string>
        label="Current Password"
        name="current_password"
        rules={[
          { required: true, message: 'Current Password cannot be empty!' },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<string>
        label="New Password"
        name="new_password"
        rules={[
          { required: true, message: 'New Password cannot be empty!' },
          { min: 8, message: 'Password must be at least 8 characters long' },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<string>
        label="Confirm New Password"
        name="confirm_new_password"
        dependencies={['new_password']}
        rules={[
          { required: true, message: 'Confirm New Password cannot be empty!' },
          ({ getFieldValue }) => ({
            async validator(_, value: string) {
              if (value === '' || getFieldValue('new_password') === value) {
                await Promise.resolve();
                return;
              }
              return await Promise.reject(
                new Error("The two passwords don't match")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePasswordForm;
