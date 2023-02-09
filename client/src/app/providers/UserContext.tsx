import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type UserType = {
  userId?: string;
  userEmail?: string;
};

export type UserContextType = {
  isLoggedIn: boolean | null;
  setisLoggedIn?: (isLoggedIn: boolean | null) => void;
  user: UserType | null;
  setUser?: (user: UserType | null) => void;
  getUser?: () => Promise<void>;
  destroySession?: () => void;
};

export const UserContext: React.Context<UserContextType> = createContext<UserContextType>({
  isLoggedIn: null,
  user: null,
  destroySession: () => {},
});

interface UserContextProviderProps {
  children?: React.ReactNode;
}

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const navigate = useNavigate();
  const [isLoggedIn, setisLoggedIn] = useState<boolean | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const destroySession = () => {
    setisLoggedIn(null);
    setUser({});
    navigate('/');
  };

  const getUser = async () => {
    const response = await fetch('/check-auth-user');
    const responseJson = await response.json();
    setUser(responseJson);
    if (Object.keys(responseJson)?.length !== 0) {
      return setisLoggedIn(true);
    }
    setisLoggedIn(false);
  };
  return (
    <UserContext.Provider
      value={{ isLoggedIn, setisLoggedIn, user, setUser, destroySession, getUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider };
