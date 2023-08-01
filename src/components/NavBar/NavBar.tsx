import React from 'react';

import {
  FacebookFilled,
  TwitterOutlined,
  LinkedinFilled,
  InstagramOutlined,
} from '@ant-design/icons';
import { Button, Col, Row, Space, Typography } from 'antd';

import styles from './NavBar.css';

const { Text } = Typography;

const NavBar: React.FC = () => (
  <Row align={'middle'}>
    <Col span={3}>
      <img className={styles.navbarLogoContainer} src="./scholarx-logo.png" />
    </Col>
    <Col span={12}>
      <Space size={80}>
        <Text className={styles.antTypography}>Home</Text>
        <Text className={styles.antTypography}>About</Text>
        <Text className={styles.antTypography}>Initiatives</Text>
        <Text className={styles.antTypography}>Join Us</Text>
      </Space>
    </Col>
    <Col span={4} offset={5}>
      <Space size={10}>
        <Button className={styles.antButton} shape="circle">
          <img src="/facebook-icon.png" width={20} />
        </Button>
        <Button className={styles.antButton} shape="circle">
          <TwitterOutlined className={styles.antIcon} />
        </Button>
        <Button className={styles.antButton} shape="circle">
          <LinkedinFilled className={styles.antIcon} />
        </Button>
        <Button className={styles.antButton} shape="circle">
          <InstagramOutlined className={styles.antIcon} />
        </Button>
        <Button>Join Us</Button>
      </Space>
    </Col>
  </Row>
);
export default NavBar;
