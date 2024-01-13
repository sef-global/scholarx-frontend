import React, { useContext, useState } from 'react';

import {
  TwitterOutlined,
  LinkedinFilled,
  InstagramOutlined,
  FacebookFilled,
} from '@ant-design/icons';
import { Avatar, Button, Drawer, Space, Typography } from 'antd';

import {
  UserContext,
  type UserContextType,
} from './../../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

import styles from './MenuDrawer.module.css';

const { Text } = Typography;

interface MenuDrawerProps {
  openMenu: boolean;
  setOpenMenu: (value: boolean) => void;
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({ openMenu, setOpenMenu }) => {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const navigate = useNavigate();

  const { user } = useContext(UserContext) as UserContextType;

  const handleOpenMenu = (): boolean => {
    return openMenu;
  };

  const handleCloseMenu = (): void => {
    setOpenMenu(false);
  };

  const handleLoginModalOpen = (): void => {
    setIsLoginModalVisible(true);
  };

  const handleMentorRegistration = (): void => {
    console.log('Clicked');
    if (user === null) {
      handleLoginModalOpen();
    } else {
      navigate('/mentor-registration');
    }
  };

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
        <Button
          className="mr-5 mb-5 w-40 h-9 font-sans text-black-400 py-1 px-4 rounded"
          onClick={handleMentorRegistration}
        >
          Become a Mentor
        </Button>
        <Space direction="horizontal" size={20}>
          <a
            href="https://www.facebook.com/sustainableeducationfoundation/"
            target="_blank"
            rel="noreferrer"
          >
            <Button className={styles.antButton} shape="circle">
              <FacebookFilled className={styles.antIcon} />
            </Button>
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
