import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LoadingIndicator } from "../components/LoadingIndicator";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();
  if (loading) {
    return <LoadingIndicator />;
  }

  if (!user || !isAuthenticated) {
    return <Navigate to="/contact-sync" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
