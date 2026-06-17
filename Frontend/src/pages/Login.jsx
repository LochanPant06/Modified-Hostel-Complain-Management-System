import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../api/axios";

function Login() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const endpoint =
        role === "student"
          ? "/students/login"
          : "/admins/login";

      const emailField =
        role === "student"
          ? { collegeEmail: email }
          : { officialEmail: email };

      const response = await api.post(
        endpoint,
        {
          ...emailField,
          password,
        }
      );

      console.log(response.data);

      localStorage.setItem(
        "role",
        role
      );

      toast.success(
        "Login Successful"
      );

      if (role === "student") {
        navigate("/student/dashboard");
      } else {
        navigate("/admin/dashboard");
      }

    } catch (error) {

      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-[1px] scale-110"
        style={{
          backgroundImage: "url('/hostel-bg.png')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Login Card */}
      <div className="relative h-screen flex items-center justify-center px-4">

        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">

          <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
            Hostel Complaint Portal
          </h1>

          <p className="text-center text-slate-500 mb-6">
            Manage and track hostel complaints efficiently
          </p>

          <form
            onSubmit={handleLogin}
            className="space-y-4"
          >

            <select
              className="
                w-full
                border
                border-slate-300
                p-3
                rounded-lg
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
            >
              <option value="student">
                Student
              </option>

              <option value="admin">
                Admin
              </option>
            </select>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                border
                border-slate-300
                p-3
                rounded-lg
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
              required
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                w-full
                border
                border-slate-300
                p-3
                rounded-lg
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-blue-600
                hover:bg-blue-700
                disabled:bg-blue-400
                transition
                duration-200
                text-white
                font-semibold
                p-3
                rounded-lg
              "
            >
              {loading
                ? "Logging In..."
                : "Login"}
            </button>

          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            New Student?{" "}
            <span
              className="
                text-blue-600
                font-medium
                cursor-pointer
                hover:underline
              "
              onClick={() =>
                navigate("/register")
              }
            >
              Register Here
            </span>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;