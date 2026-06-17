import { Routes, Route } from "react-router-dom";

import Login from "..//pages/Login";
import Register from "..//pages/Register";
import StudentDashboard from "..//pages/StudentDashboard";
import CreateComplaint from "..//pages/CreateComplaint";
import MyComplaints from "..//pages/MyComplaints";
import AdminDashboard from "..//pages/AdminDashbord";
import ProtectedRoute from "..//components/ProtectedRoute";

function AppRoutes() {
  return(
  <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/create"
        element={
          <ProtectedRoute>
            <CreateComplaint />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/complaints"
        element={
          <ProtectedRoute>
            <MyComplaints />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

    </Routes>);
}

export default AppRoutes;