import React from 'react';

import {
  TwitterOutlined,
  LinkedinFilled,
  InstagramOutlined,
} from '@ant-design/icons';
import { Button, Col, Row, Space, Typography } from 'antd';

import styles from './NavBar.css';

const { Text } = Typography;

const NavBar: React.FC = () => (
  <Row align={'middle'}>
    <Col span={15}>
      <Space size={80} direction="horizontal">
        <img className={styles.navbarLogoContainer} src="./scholarx-logo.png" />
        <a href="https://sefglobal.org/">
          <Text className={styles.antTypography}>Home</Text>
        </a>
        <a href="" target="_blank" rel="noreferrer">
          <Text className={styles.antTypography}>About</Text>
        </a>
        <a href="" target="_blank" rel="noreferrer">
          <Text className={styles.antTypography}>Initiatives</Text>
        </a>
        <a href="" target="_blank" rel="noreferrer">
          <Text className={styles.antTypography}>Join Us</Text>
        </a>
      </Space>
    </Col>
    <Col span={4} offset={5}>
      <Space size={10} direction="horizontal">
        <a
          href="https://www.facebook.com/sustainableeducationfoundation/"
          target="_blank"
          rel="noreferrer"
        >
          <Button
            className={styles.antButton}
            shape="circle"
            icon={<img src="/facebook-icon.png" width={20} />}
          />
        </a>
        <a href="https://twitter.com/goasksef" target="_blank" rel="noreferrer">
          <Button className={styles.antButton} shape="circle">
            <TwitterOutlined className={styles.antIcon} />
          </Button>
        </a>
        <a
          href="https://www.linkedin.com/company/sefglobal/"
          target="_blank"
          rel="noreferrer"
        >
          <Button className={styles.antButton} shape="circle">
            <LinkedinFilled className={styles.antIcon} />
          </Button>
        </a>
        <a
          href="https://www.instagram.com/sefglobal/"
          target="_blank"
          rel="noreferrer"
        >
          <Button className={styles.antButton} shape="circle">
            <InstagramOutlined className={styles.antIcon} />
          </Button>
        </a>
        <Button className={styles.loginButton}>Join Us</Button>
      </Space>
    </Col>
  </Row>
);
export default NavBar;
