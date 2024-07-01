import type React from 'react';
import { createContext, useState, useContext } from 'react';

const LoginModalContext = createContext<{
  handleLoginModalOpen: () => void;
  handleLoginModalClose: () => void;
  handleLogoutModalClose: () => void;
  handleRegisterModalOpen: () => void;
  handleRegisterModalClose: () => void;
  handleLogoutModalOpen: () => void;
  handleForgotPasswordModalOpen: () => void;
  handleForgotPasswordModalClose: () => void;
  isLoginModalVisible: boolean;
  isRegisterModalVisible: boolean;
  isLogoutModalVisible: boolean;
  isForgotPasswordModalVisible: boolean;
}>({
  isLogoutModalVisible: false,
  isRegisterModalVisible: false,
  isLoginModalVisible: false,
  isForgotPasswordModalVisible: false,
  handleLoginModalOpen: () => {},
  handleLoginModalClose: () => {},
  handleLogoutModalClose: () => {},
  handleRegisterModalOpen: () => {},
  handleRegisterModalClose: () => {},
  handleLogoutModalOpen: () => {},
  handleForgotPasswordModalOpen: () => {},
  handleForgotPasswordModalClose: () => {},
});

export const LoginModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isForgotPasswordModalVisible, setIsForgotPasswordModalVisible] =
    useState(false);

  const handleLoginModalClose = () => {
    setIsLoginModalVisible(false);
  };

  const handleLoginModalOpen = () => {
    setIsLoginModalVisible(true);
  };

  const handleRegisterModalClose = () => {
    setIsRegisterModalVisible(false);
  };

  const handleRegisterModalOpen = () => {
    setIsRegisterModalVisible(true);
  };

  const handleLogoutModalClose = () => {
    setIsLogoutModalVisible(false);
  };

  const handleLogoutModalOpen = () => {
    setIsLogoutModalVisible(true);
  };

  const handleForgotPasswordModalClose = () => {
    setIsForgotPasswordModalVisible(false);
  };

  const handleForgotPasswordModalOpen = () => {
    setIsForgotPasswordModalVisible(true);
  };

  return (
    <LoginModalContext.Provider
      value={{
        isLoginModalVisible,
        isRegisterModalVisible,
        isLogoutModalVisible,
        isForgotPasswordModalVisible,
        handleLoginModalClose,
        handleLoginModalOpen,
        handleRegisterModalClose,
        handleRegisterModalOpen,
        handleLogoutModalClose,
        handleLogoutModalOpen,
        handleForgotPasswordModalClose,
        handleForgotPasswordModalOpen,
      }}
    >
      {children}
    </LoginModalContext.Provider>
  );
};

export const useLoginModalContext = () => useContext(LoginModalContext);
