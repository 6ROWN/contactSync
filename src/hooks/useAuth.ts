import { useAuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const { isAuthenticated, user, loading } = useAuthContext();
  return { isAuthenticated, user, loading };
};
