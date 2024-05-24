import React, { createContext } from 'react';
import type { Profile } from '../types';
import { ApplicationStatus, ProfileTypes } from '../enums';
import useProfile from '../hooks/useProfile';

export interface UserContextType {
  user: Profile | null;
  isUserLoading: boolean;
  isUserMentor: boolean;
  isUserAdmin: boolean;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: user, isLoading: isUserLoading } = useProfile();
  const isUserAdmin = user?.type === ProfileTypes.ADMIN;
  const isUserMentor =
    user?.mentor?.some(
      (mentor) => mentor.state === ApplicationStatus.APPROVED
    ) ?? false;

  return (
    <UserContext.Provider
      value={{
        user,
        isUserLoading,
        isUserMentor,
        isUserAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
