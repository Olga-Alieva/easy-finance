import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import React, { useContext } from 'react';

const Protected = ({ children }) => {
  const { isLoggedIn } = useContext(UserContext);
  if (isLoggedIn === false) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default Protected;
