import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  children?: ReactElement;
  isAuthenticated: boolean;
  adminOnly?: boolean;
  admin?: boolean;
  redirect?: string;
  loading?: boolean;
}

const protectedRoute = ({
  children,
  isAuthenticated,
  adminOnly,
  admin,
  redirect = "/",
}: Props) => {
  // console.log("isAuthenticated:", isAuthenticated);
  // console.log("admin:", admin);
  // console.log("loading:", loading);
  // if (loading) <Loader />
  if (!isAuthenticated) return <Navigate to={redirect} />;

  if (adminOnly && !admin) return <Navigate to={redirect} />;

  return children ? children : <Outlet />;
};

export default protectedRoute;
