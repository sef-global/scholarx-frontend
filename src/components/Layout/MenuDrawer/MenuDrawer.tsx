import React from 'react';

import {
  TwitterOutlined,
  LinkedinFilled,
  InstagramOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Drawer, Space, Typography } from 'antd';

import styles from './MenuDrawer.css';

const { Text } = Typography;

interface MenuDrawerProps {
  openMenu: boolean;
  setOpenMenu: (value: boolean) => void;
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({ openMenu, setOpenMenu }) => {
  function handleOpenMenu() {
    return openMenu;
  }

  function handleCloseMenu() {
    setOpenMenu(false);
  }
  return (
    <Drawer
      open={handleOpenMenu()}
      placement="right"
      onClose={() => {
        handleCloseMenu();
      }}
      width={320}
      closable
    >
      <Space className={styles.drawerContent} direction="vertical" size={50}>
        <Avatar size={135} />
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
        <Space direction="horizontal" size={20}>
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
        </Space>
      </Space>
    </Drawer>
  );
};
export default MenuDrawer;
