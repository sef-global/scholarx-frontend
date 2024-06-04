import React, { createContext, useState, useContext } from 'react';

const LoginModalContext = createContext<{
  handleLoginModalOpen: () => void;
  handleLoginModalClose: () => void;
  handleLogoutModalClose: () => void;
  handleRegisterModalOpen: () => void;
  handleRegisterModalClose: () => void;
  handleLogoutModalOpen: () => void;
  isLoginModalVisible: boolean;
  isRegisterModalVisible: boolean;
  isLogoutModalVisible: boolean;
}>({
  isLogoutModalVisible: false,
  isRegisterModalVisible: false,
  isLoginModalVisible: false,
  handleLoginModalOpen: () => {},
  handleLoginModalClose: () => {},
  handleLogoutModalClose: () => {},
  handleRegisterModalOpen: () => {},
  handleRegisterModalClose: () => {},
  handleLogoutModalOpen: () => {},
});

export const LoginModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

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

  return (
    <LoginModalContext.Provider
      value={{
        isLoginModalVisible,
        isRegisterModalVisible,
        isLogoutModalVisible,
        handleLoginModalClose,
        handleLoginModalOpen,
        handleRegisterModalClose,
        handleRegisterModalOpen,
        handleLogoutModalClose,
        handleLogoutModalOpen,
      }}
    >
      {children}
    </LoginModalContext.Provider>
  );
};

export const useLoginModalContext = () => useContext(LoginModalContext);
