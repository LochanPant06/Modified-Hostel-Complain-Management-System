import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import Navbar from "../components/Navbar";

function CreateComplaint() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/complaints/create",
        formData
      );

      console.log(response.data);

      alert("Complaint Created Successfully");

      navigate("/student/complaints");

    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
        "Failed To Create Complaint"
      );
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-[1px] scale-110"
        style={{
          backgroundImage: "url('/hostel-bg.png')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-900/60" />

      {/* Content */}
      <div className="relative z-10 p-6">

        <Navbar />

        <div className="max-w-3xl mx-auto mt-8">

          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8">

            <h1 className="text-4xl font-bold text-slate-800 text-center">
              Create Complaint
            </h1>

            <p className="text-center text-slate-500 mt-2 mb-8">
              Submit your hostel issue
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <input
                type="text"
                name="title"
                placeholder="Complaint Title"
                value={formData.title}
                onChange={handleChange}
                className="
                  w-full
                  border
                  border-slate-300
                  rounded-xl
                  p-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
                required
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="
                  w-full
                  border
                  border-slate-300
                  rounded-xl
                  p-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
                required
              >
                <option value="">
                  Select Category
                </option>

                <option value="Electrical">
                  Electrical
                </option>

                <option value="Plumbing">
                  Plumbing
                </option>

                <option value="Internet">
                  Internet
                </option>

                <option value="Cleaning">
                  Cleaning
                </option>

                <option value="Furniture">
                  Furniture
                </option>

                <option value="Other">
                  Other
                </option>
              </select>

              <textarea
                rows="6"
                name="description"
                placeholder="Describe your issue..."
                value={formData.description}
                onChange={handleChange}
                className="
                  w-full
                  border
                  border-slate-300
                  rounded-xl
                  p-3
                  resize-none
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
                required
              />

              <button
                type="submit"
                className="
                  w-full
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  font-semibold
                  p-3
                  rounded-xl
                  transition
                "
              >
                Submit Complaint
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CreateComplaint;