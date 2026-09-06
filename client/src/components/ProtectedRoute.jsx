import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../api/auth";

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}