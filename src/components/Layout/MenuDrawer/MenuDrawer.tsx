import React from 'react';

import { Avatar, Button, Drawer, Space, Typography } from 'antd';

import styles from './MenuDrawer.module.css';
import TwitterIcon from '../../../assets/svg/Icons/TwitterIcon';
import FacebookIcon from '../../../assets/svg/Icons/FacebookIcon';
import LinkedinIcon from '../../../assets/svg/Icons/LinkedinIcon';
import InstagramIcon from '../../../assets/svg/Icons/InstagramIcon';

const { Text } = Typography;

interface MenuDrawerProps {
  openMenu: boolean;
  setOpenMenu: (value: boolean) => void;
  handleMentorRegistration: () => void;
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({
  openMenu,
  setOpenMenu,
  handleMentorRegistration,
}) => {
  const handleOpenMenu = (): boolean => {
    return openMenu;
  };

  const handleCloseMenu = (): void => {
    setOpenMenu(false);
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
              <FacebookIcon />
            </Button>
          </a>
          <a
            href="https://twitter.com/goasksef"
            target="_blank"
            rel="noreferrer"
          >
            <Button className={styles.antButton} shape="circle">
              <TwitterIcon />
            </Button>
          </a>
          <a
            href="https://www.linkedin.com/company/sefglobal/"
            target="_blank"
            rel="noreferrer"
          >
            <Button className={styles.antButton} shape="circle">
              <LinkedinIcon />
            </Button>
          </a>
          <a
            href="https://www.instagram.com/sefglobal/"
            target="_blank"
            rel="noreferrer"
          >
            <Button className={styles.antButton} shape="circle">
              <InstagramIcon />
            </Button>
          </a>
        </Space>
      </Space>
    </Drawer>
  );
};
export default MenuDrawer;
