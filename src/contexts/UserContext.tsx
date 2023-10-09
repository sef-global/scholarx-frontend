import React, { createContext, useState, useEffect, useContext } from 'react';
import axios, { type AxiosResponse } from 'axios';
import type { Profile } from '../types';
import { API_URL } from './../constants';
export interface UserContextType {
  user: any;
  setUser: any;
}

export const UserContext = createContext({} as UserContextType);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<Profile | null>(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = (): void => {
    axios
      .get(`${API_URL}/me/profile`, { withCredentials: true })
      .then((response: AxiosResponse<Profile>) => {
        setUser(response.data);
      })
      .catch((error) => {
        if (error.response.status !== 401) {
          console.error({
            message: 'Something went wrong when fetching the user',
            description: error.toString(),
          });
        } else {
          setUser(null);
        }
      });
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
