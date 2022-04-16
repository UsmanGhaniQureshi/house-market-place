import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../store/AuthContext";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) return <LoadingSpinner />;
  return !loading && user ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;
