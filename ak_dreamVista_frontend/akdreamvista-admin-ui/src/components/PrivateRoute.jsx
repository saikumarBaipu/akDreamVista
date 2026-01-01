import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, role }) {
  const userRole = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  // ✅ ADMIN ACCESS (MASTER LOGIN)
  if (role === "ADMIN" && userRole === "ADMIN") {
    return children;
  }

  // ✅ USER ACCESS
  if (token && userRole === role) {
    return children;
  }

  // ❌ UNAUTHORIZED
  return <Navigate to="/login" replace />;
}
