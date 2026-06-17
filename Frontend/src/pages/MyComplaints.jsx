import { useEffect, useState } from "react";

import api from "../api/axios";
import Navbar from "../components/Navbar";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    try {
      const response = await api.get(
        "/complaints/my-complaints"
      );

      setComplaints(response.data.data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleDelete = async (complaintId) => {
    try {

      await api.delete(
        `/complaints/${complaintId}`
      );

      setComplaints(
        complaints.filter(
          (complaint) =>
            complaint._id !== complaintId
        )
      );

    } catch (error) {

      console.error(error);

      alert("Failed To Delete Complaint");

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

        <Navbar />

        <div className="max-w-6xl mx-auto mt-8">

          <h1 className="text-4xl font-bold text-white text-center mb-8">
            My Complaints
          </h1>

          {complaints.length === 0 ? (

            <div className="bg-white/95 rounded-3xl p-8 text-center">
              <h2 className="text-2xl font-semibold text-slate-700">
                No Complaints Found
              </h2>

              <p className="text-slate-500 mt-2">
                Create your first complaint.
              </p>
            </div>

          ) : (

            <div className="grid md:grid-cols-2 gap-6">

              {complaints.map((complaint) => (

                <div
                  key={complaint._id}
                  className="
                    bg-white/95
                    backdrop-blur-sm
                    rounded-3xl
                    shadow-xl
                    p-6
                  "
                >

                  <div className="flex justify-between items-start">

                    <h2 className="text-2xl font-bold text-slate-800">
                      {complaint.title}
                    </h2>

                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-medium
                        ${getStatusColor(
                          complaint.status
                        )}
                      `}
                    >
                      {complaint.status}
                    </span>

                  </div>

                  <p className="text-slate-500 mt-3">
                    {complaint.description}
                  </p>

                  <div className="mt-4 flex justify-between items-center">

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {complaint.category}
                    </span>

                    <span className="text-sm text-slate-500">
                      {new Date(
                        complaint.createdAt
                      ).toLocaleDateString()}
                    </span>

                  </div>

                  <button
                    onClick={() =>
                      handleDelete(
                        complaint._id
                      )
                    }
                    className="
                      mt-5
                      w-full
                      bg-red-500
                      hover:bg-red-600
                      text-white
                      py-2
                      rounded-xl
                      font-medium
                      transition
                    "
                  >
                    Delete Complaint
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default MyComplaints;