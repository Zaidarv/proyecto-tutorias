import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
export const ProtectedRoute = ({
  redirectTo,
  isAllowed,
  allowedRoles,
  children,
}) => {
  const { user } = useAuth();

  if (!isAllowed || (allowedRoles && !allowedRoles.includes(user?.id_rol))) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};
