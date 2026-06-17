import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const role =
    localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;