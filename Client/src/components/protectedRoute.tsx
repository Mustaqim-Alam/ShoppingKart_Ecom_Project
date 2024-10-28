import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children?: ReactElement;
  isAuthenticated: boolean;
  adminRoute?: boolean;
  isAdmin?: boolean;
  redirect?: string;
}

const protectedRoute = ({
  children,
  isAuthenticated,
  adminRoute,
  isAdmin,
  redirect = "/",
}: Props) => {
  if (!isAuthenticated) return <Navigate to={redirect} />;

  return children;
};

export default protectedRoute;
