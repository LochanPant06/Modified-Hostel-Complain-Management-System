import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    rollNo: "",
    year: "",
    hostelName: "",
    roomNo: "",
    collegeEmail: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/students/register",
        formData
      );

      console.log(response.data);

      ("Registration Successful");

      navigate("/");

    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

return (
  <div className="relative min-h-screen w-screen overflow-hidden">

    {/* Background Image */}
    <div
      className="absolute inset-0 bg-cover bg-center blur-[1px] scale-110"
      style={{
        backgroundImage: "url('/hostel-bg.png')",
      }}
    />

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/30" />

    {/* Content */}
    <div className="relative min-h-screen flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-4xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center text-slate-800">
          Student Registration
        </h1>

        <p className="text-center text-slate-500 mt-2 mb-8">
          Create your Hostel Complaint Portal account
        </p>

        <form
          onSubmit={handleRegister}
          className="grid md:grid-cols-2 gap-4"
        >

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="text"
            name="rollNo"
            placeholder="Roll Number"
            value={formData.rollNo}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">
              Select Year
            </option>

            <option value="1">
              First Year
            </option>

            <option value="2">
              Second Year
            </option>

            <option value="3">
              Third Year
            </option>

            <option value="4">
              Fourth Year
            </option>
          </select>

          <input
            type="text"
            name="hostelName"
            placeholder="Hostel Name"
            value={formData.hostelName}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="text"
            name="roomNo"
            placeholder="Room Number"
            value={formData.roomNo}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            name="collegeEmail"
            placeholder="College Email"
            value={formData.collegeEmail}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
            required
          />

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-xl transition duration-200"
            >
              Register
            </button>
          </div>

          <div className="md:col-span-2 text-center">
            <p className="text-slate-600">
              Already have an account?
              <span
                onClick={() => navigate("/")}
                className="text-blue-600 font-medium ml-2 cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          </div>

        </form>

      </div>

    </div>

  </div>
);
}

export default Register;

