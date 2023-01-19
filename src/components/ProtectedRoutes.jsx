import { useContext } from "react";
import { DataContext } from "../Context/context";
import { Navigate } from "react-router-dom";
const ProtectedRoutes = ({ children }) => {
  const { user } = useContext(DataContext);
  if (user && user.email !== "osamatwenty@gmail.com") {
    return <Navigate to="/" />;
  }
  return children;
};
export default ProtectedRoutes;
