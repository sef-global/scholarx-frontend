import React, { useState } from 'react';

import {
  AlignRightOutlined,
  TwitterOutlined,
  LinkedinFilled,
  InstagramOutlined,
} from '@ant-design/icons';
import { Button, Col, Row, Space, Typography } from 'antd';

import styles from './NavBar.css';
import MenuDrawer from '../MenuDrawer/MenuDrawer';

const { Text } = Typography;

const NavBar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <Row align={'middle'} justify={'start'}>
        <Col xs={20} md={2} lg={4} xl={4} xxl={4}>
          <img
            className={styles.navbarLogoContainer}
            src="./scholarx-logo.png"
          />
        </Col>
        <AlignRightOutlined
          className={styles.menuIcon}
          onClick={() => {
            setOpenMenu(true);
          }}
        />
        <Col md={16} lg={14} xl={15} xxl={16}>
          <Space direction="horizontal">
            <div className={styles.navbarItemContainer}>
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
            </div>
          </Space>
        </Col>
        <Col md={4} lg={4} xl={3} className={styles.socialMediaContainer}>
          <Space direction="horizontal">
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
            <a
              href="https://twitter.com/goasksef"
              target="_blank"
              rel="noreferrer"
            >
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
      <MenuDrawer openMenu={openMenu} setOpenMenu={setOpenMenu} />
    </>
  );
};
export default NavBar;
