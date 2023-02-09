import { Navigate } from 'react-router-dom';
import { UserContext } from 'app/providers/UserContext';
import { useContext } from 'react';

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps): JSX.Element => {
  const { isLoggedIn } = useContext(UserContext);
  if (isLoggedIn === false) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
