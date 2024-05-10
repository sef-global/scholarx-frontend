import React, { useContext, useState } from 'react';

import {
  AlignRightOutlined,
  TwitterOutlined,
  LinkedinFilled,
  InstagramOutlined,
  FacebookFilled,
} from '@ant-design/icons';
import { Button, Col, Row, Space, Typography } from 'antd';

import styles from './Navbar.module.css';
import MenuDrawer from '../MenuDrawer/MenuDrawer';
import LoginModal from '../../LoginModal';
import RegisterModal from '../../RegisterModal';

import {
  UserContext,
  type UserContextType,
} from './../../../contexts/UserContext';
import LogoutModal from '../../LogoutModal';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const Navbar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const navigate = useNavigate();

  const { user } = useContext(UserContext) as UserContextType;

  const handleLoginModalClose = (): void => {
    setIsLoginModalVisible(false);
  };

  const handleLoginModalOpen = (): void => {
    setIsLoginModalVisible(true);
  };

  const handleRegisterModalClose = (): void => {
    setIsRegisterModalVisible(false);
  };

  const handleRegisterModalOpen = (): void => {
    setIsRegisterModalVisible(true);
  };

  const handleLogoutModalClose = (): void => {
    setIsLogoutModalVisible(false);
  };

  const handleLogoutModalOpen = (): void => {
    setIsLogoutModalVisible(true);
  };

  const handleMentorRegistration = (): void => {
    if (user === null) {
      handleLoginModalOpen();
    } else {
      navigate('/mentor-registration');
    }
    setOpenMenu(false);
  };

  return (
    <>
      <Row align={'middle'} justify={'start'}>
        <Col xs={20} md={2} lg={4} xl={4} xxl={4}>
          <img
            className={styles.navbarLogoContainer}
            src="/scholarx-logo.png"
          />
        </Col>
        <AlignRightOutlined
          className={styles.menuIcon}
          onClick={() => {
            setOpenMenu(true);
          }}
        />
        <Col md={16} lg={12} xl={14} xxl={16}>
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
              <Button
                className="mr-5 mb-5 w-40 h-9 font-sans text-black-400 py-1 px-4 rounded"
                onClick={handleMentorRegistration}
              >
                Become a Mentor
              </Button>
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
            {user === null ? (
              <>
                <Button
                  className={styles.loginButton}
                  onClick={handleLoginModalOpen}
                >
                  Login
                </Button>
                <Button
                  className={styles.loginButton}
                  onClick={handleRegisterModalOpen}
                >
                  Register
                </Button>
              </>
            ) : (
              <Button
                className={styles.loginButton}
                onClick={handleLogoutModalOpen}
              >
                Logout
              </Button>
            )}
          </Space>
        </Col>
      </Row>
      <MenuDrawer
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        handleMentorRegistration={handleMentorRegistration}
      />
      {isLoginModalVisible ? (
        <LoginModal handleClose={handleLoginModalClose} />
      ) : null}
      {isRegisterModalVisible ? (
        <RegisterModal handleClose={handleRegisterModalClose} />
      ) : null}
      {isLogoutModalVisible && <LogoutModal onClose={handleLogoutModalClose} />}
    </>
  );
};

export default Navbar;
