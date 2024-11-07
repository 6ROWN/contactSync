import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = false;  

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/contact-sync" />;
  }

  // If authenticated, render the children components (Home page)
  return <>{children}</>;
};

export default ProtectedRoute;
