import React from 'react';
import { Form, Image, Button, Typography, Anchor, Modal } from 'antd';
import {
  LinkedinFilled,
  GoogleOutlined,
  CloseCircleFilled,
} from '@ant-design/icons';
import styles from './UserLogin.module.css';

const { Text } = Typography;
const { Link } = Anchor;

const UserLogin: React.FC = () => (
  <Modal className={styles.cardContainer}>
    <Button
      type="text"
      icon={<CloseCircleFilled />}
      className={styles.closeButton}
    />
    <div className={styles.imageContainer}>
      <Image
        src="https://sefglobal.org/assets/img/brand/scholarx.png"
        preview={false}
      />
    </div>
    <Form className={styles.formContainer}>
      <Form.Item>
        <input type="text" placeholder="Username" />
      </Form.Item>
      <Form.Item>
        <input type="password" placeholder="Password" />
        <Link href="" title="Forgot Password?" className={styles.link} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className={styles.loginButton}>
          Login
        </Button>
      </Form.Item>
    </Form>
    <div className={styles.socialContainer}>
      <div className={styles.signinText}>
        <Text type="secondary">or Sign-In with</Text>
      </div>
      <div className={styles.socialButtons}>
        <Button type="default" htmlType="submit">
          <GoogleOutlined />
          Google
        </Button>
        <Button type="default" htmlType="submit">
          <LinkedinFilled />
          LinkedIn
        </Button>
      </div>
    </div>
    <div className={styles.registerText}>
      <Text>Don`&apos;`t have an account?</Text>
      <Link href="" title="Register" />
    </div>
  </Modal>
);

export default UserLogin;
