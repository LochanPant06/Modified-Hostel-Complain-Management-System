import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "../api/axios";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    try {
      const response = await api.get(
        "/complaints/all"
      );

      setComplaints(response.data.data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleStatusUpdate = async (
    complaintId,
    status
  ) => {
    try {

      await api.patch(
        `/complaints/${complaintId}/status`,
        {
          status,
        }
      );

      setComplaints(
        complaints.map((complaint) =>
          complaint._id === complaintId
            ? {
                ...complaint,
                status,
              }
            : complaint
        )
      );

    } catch (error) {
      console.error(error);

      toast.error("Failed to update status");
    }
  };

  const getStatusColor = (status) => {

    switch (status) {

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "In Progress":
        return "bg-blue-100 text-blue-700";

      case "Resolved":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
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

        {/* Header */}

        <div className="bg-white/95 rounded-3xl shadow-xl p-6 mb-8">

          <h1 className="text-4xl font-bold text-slate-800">
            Admin Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Manage all hostel complaints
          </p>

        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-4 gap-4 mb-8">

          <div className="bg-blue-500 text-white rounded-2xl p-5">
            <h2>Total</h2>

            <p className="text-4xl font-bold mt-2">
              {complaints.length}
            </p>
          </div>

          <div className="bg-yellow-500 text-white rounded-2xl p-5">
            <h2>Pending</h2>

            <p className="text-4xl font-bold mt-2">
              {
                complaints.filter(
                  (c) =>
                    c.status === "Pending"
                ).length
              }
            </p>
          </div>

          <div className="bg-green-500 text-white rounded-2xl p-5">
            <h2>Resolved</h2>

            <p className="text-4xl font-bold mt-2">
              {
                complaints.filter(
                  (c) =>
                    c.status === "Resolved"
                ).length
              }
            </p>
          </div>

          <div className="bg-red-500 text-white rounded-2xl p-5">
            <h2>Rejected</h2>

            <p className="text-4xl font-bold mt-2">
              {
                complaints.filter(
                  (c) =>
                    c.status === "Rejected"
                ).length
              }
            </p>
          </div>

        </div>

        {/* Complaint Cards */}

        <div className="grid gap-6">

          {complaints.map((complaint) => (

            <div
              key={complaint._id}
              className="
                bg-white/95
                rounded-3xl
                shadow-xl
                p-6
              "
            >

              <div className="flex flex-col md:flex-row md:justify-between gap-4">

                <div>

                  <h2 className="text-2xl font-bold text-slate-800">
                    {complaint.title}
                  </h2>

                  <p className="text-slate-600 mt-2">
                    {complaint.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-4">

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      {complaint.category}
                    </span>

                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        ${getStatusColor(
                          complaint.status
                        )}
                      `}
                    >
                      {complaint.status}
                    </span>

                  </div>

                </div>

                <div className="min-w-[220px]">

                  <select
                    value={complaint.status}
                    onChange={(e) =>
                      handleStatusUpdate(
                        complaint._id,
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      border
                      border-slate-300
                      rounded-xl
                      p-3
                    "
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Resolved">
                      Resolved
                    </option>

                    <option value="Rejected">
                      Rejected
                    </option>

                  </select>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;