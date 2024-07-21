import React, { createContext } from 'react';
import type { Mentor, Profile } from '../types';
import { ApplicationStatus, ProfileTypes } from '../enums';
import useProfile from '../hooks/useProfile';

export interface UserContextType {
  user: Profile | null | undefined;
  isUserLoading: boolean;
  isUserMentor: boolean;
  isUserAdmin: boolean;
  isUserMentee: boolean;
  mentor: Mentor | null;
  pendingMenteeApplication: boolean;
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
  const pendingMenteeApplication =
    user?.mentee?.some(
      (mentee) => mentee.state === ApplicationStatus.PENDING
    ) ?? false;
  const isUserMentee =
    user?.mentee?.some(
      (mentee) => mentee.state === ApplicationStatus.APPROVED
    ) ?? false;

  return (
    <UserContext.Provider
      value={{
        user,
        isUserLoading,
        isUserMentor,
        isUserAdmin,
        isUserMentee,
        mentor,
        pendingMenteeApplication,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
