import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // This is "USER,ADMIN"

  if (!token) {
    return <Navigate to="/admin-login" />;
  }

  if (role && (!userRole || !userRole.includes(role))) {
    return <Navigate to="/admin-login" />; 
  }

  return children;
};

export default PrivateRoute;