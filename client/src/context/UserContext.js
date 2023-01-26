import { createContext, useState } from 'react';

export const UserContext = createContext({});

function UserContextProvider({ children }) {
  const [isLoggedIn, setisLoggedIn] = useState(null);
  const [user, setUser] = useState(null);
  const destroySession = () => {
    setisLoggedIn(null);
    setUser({});
    window.location = '/';
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
}

export { UserContextProvider };
