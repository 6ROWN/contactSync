import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !isAuthenticated) {
    return <Navigate to="/contact-sync" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
