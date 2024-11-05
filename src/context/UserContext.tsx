'use client';

import React, {createContext, useState, ReactNode, useContext} from 'react';

interface UserContextProps {
  icon: string;
  setIcon: (icon: string) => void;
}

const UserContext =
  createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [icon, setIcon] = useState<string>("😀");

  return (
    <UserContext.Provider value={{ icon, setIcon }}>
      {children}
    </UserContext.Provider>
  );
};

const UserProviderWrapper = ({ children }: { children: ReactNode }) => (
  <UserProvider>{children}</UserProvider>
);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error('useUser must be used within a UserProvider');
  return context;
};

export default UserProviderWrapper;
