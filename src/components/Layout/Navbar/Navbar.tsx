import React, { useContext, useState } from 'react';

import {
  AlignRightOutlined,
  TwitterOutlined,
  LinkedinFilled,
  InstagramOutlined,
  FacebookFilled,
} from '@ant-design/icons';
import { Button, Col, Row, Space, Typography } from 'antd';
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
      <Row align={'middle'} justify={'start'}
      className='max-w-[1350px] mx-auto flex items-center w-full py-2 px-auto'
      >
        <Col xs={20} md={2} lg={4} xl={4} xxl={4}>
          <img
            className=" w-[80px] sm:w-[95px] lg:w-[154px]"
            src="./scholarx-logo.png"
          />
        </Col>
        
        <Col md={16} lg={12} xl={14} xxl={16}>
          <Space direction="horizontal">
            {/* navbarItemContainer */}
            <div className="hidden xl:flex gap-7">
              <a href="https://sefglobal.org/">
                <Text className="antTypography text-primary text-sm font-light">Home</Text>
              </a>
              <a href="" target="_blank" rel="noreferrer">
                <Text className="antTypography text-primary text-sm font-light">About</Text>
              </a>
              <a href="" target="_blank" rel="noreferrer">
                <Text className="antTypography text-primary text-sm font-light">Initiatives</Text>
              </a>
              <a href="" target="_blank" rel="noreferrer">
                <Text className="antTypography text-primary text-sm font-light">Join Us</Text>
              </a>
              <Button
                className="w-40 h-9 font-sans text-black-400 rounded mt-3"
                onClick={handleMentorRegistration}
              >
                Become a Mentor
              </Button>
            </div>
          </Space>
        </Col>
        {/* socialMediaContainer */}
        <Col md={4} lg={4} xl={3} className="hidden xl:flex">
          <Space direction="horizontal">
            <a
              href="https://www.facebook.com/sustainableeducationfoundation/"
              target="_blank"
              rel="noreferrer"
            >
              <Button className="antButton"  shape="circle">
                <FacebookFilled className="text-base text-ant-icon-color" />
              </Button>
            </a>
            <a
              href="https://twitter.com/goasksef"
              target="_blank"
              rel="noreferrer"
            >
              <Button className="antButton"  shape="circle">
                <TwitterOutlined className=" text-base text-ant-icon-color" />
              </Button>
            </a>
            <a
              href="https://www.linkedin.com/company/sefglobal/"
              target="_blank"
              rel="noreferrer"
            >
              <Button className="antButton"  shape="circle">
                <LinkedinFilled className="text-base text-ant-icon-color" />
              </Button>
            </a>
            <a
              href="https://www.instagram.com/sefglobal/"
              target="_blank"
              rel="noreferrer"
            >
              <Button className="antButton" shape="circle">
                <InstagramOutlined className="text-base text-ant-icon-color" />
              </Button>
            </a>
            {user === null ? (
              <>
                <Button
                  className="antTypography loginButton"
                  onClick={handleLoginModalOpen}
                >
                  Login
                </Button>
                <Button
                  className="antTypography loginButton"
                  onClick={handleRegisterModalOpen}
                >
                  Register
                </Button>
              </>
            ) : (
              <Button
              className="antTypography loginButton"
                onClick={handleLogoutModalOpen}
              >
                Logout
              </Button>
            )}
          </Space>
        </Col>
        <AlignRightOutlined
        // menu icon
          className=" text-base flex justify-end xl:hidden mx-auto"
          onClick={() => {
            setOpenMenu(true);
          }}
        />
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
