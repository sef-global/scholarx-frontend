import React from 'react';
import { Button, Form, Input } from 'antd';

const ChangePasswordForm: React.FC = () => {
  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      wrapperCol={{ span: 14 }}
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
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
        rules={[{ required: true, message: 'New Password cannot be empty!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<string>
        label="Confirm New Password"
        name="confirm_new_password"
        rules={[
          { required: true, message: 'Confirm New Password cannot be empty!' },
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
