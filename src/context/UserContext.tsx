'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface UserContextProps {
  icon: string;
  setIcon: Dispatch<SetStateAction<string>>;
  nickname: string;
  setNickname: Dispatch<SetStateAction<string>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [icon, setIcon] = useState<string>('😀');
  const [nickname, setNickname] = useState<string>('');

  return (
    <UserContext.Provider value={{ icon, setIcon, nickname, setNickname }}>
      {children}
    </UserContext.Provider>
  );
};

const UserProviderWrapper = ({ children }: { children: ReactNode }) => (
  <UserProvider>{children}</UserProvider>
);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};

export default UserProviderWrapper;
