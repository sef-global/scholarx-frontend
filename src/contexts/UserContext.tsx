import React, { createContext } from 'react';
import type { Mentor, Profile } from '../types';
import { ApplicationStatus, ProfileTypes } from '../enums';
import useProfile from '../hooks/useProfile';

export interface UserContextType {
  user: Profile | null;
  isUserLoading: boolean;
  isUserMentor: boolean;
  isUserAdmin: boolean;
  mentor: Mentor | null;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: user, isUserLoading } = useProfile();
  const isUserAdmin = user?.type === ProfileTypes.ADMIN;
  const isUserMentor =
    user?.mentor?.some(
      (mentor) => mentor.state === ApplicationStatus.APPROVED
    ) ?? false;
  const mentor =
    user?.mentor?.find(
      (mentor) => mentor.state === ApplicationStatus.APPROVED
    ) ?? null;

  return (
    <UserContext.Provider
      value={{
        user,
        isUserLoading,
        isUserMentor,
        isUserAdmin,
        mentor,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
