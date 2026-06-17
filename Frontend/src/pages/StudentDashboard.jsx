import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function StudentDashboard() {
  const navigate = useNavigate();

  return (
<div className="relative z-10 p-6">

  <Navbar />

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
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-6 flex flex-col md:flex-row md:justify-between md:items-center">

          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Welcome Back 👋
            </h1>

            <p className="text-slate-500 mt-2">
              Hostel Complaint Management Portal
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-4 md:mt-0 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Logout
          </button>

        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-3xl p-6 shadow-xl">
            <h2 className="text-lg font-medium">
              Total Complaints
            </h2>

            <p className="text-5xl font-bold mt-4">
              12
            </p>
          </div>

          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-3xl p-6 shadow-xl">
            <h2 className="text-lg font-medium">
              Pending
            </h2>

            <p className="text-5xl font-bold mt-4">
              5
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-3xl p-6 shadow-xl">
            <h2 className="text-lg font-medium">
              Resolved
            </h2>

            <p className="text-5xl font-bold mt-4">
              7
            </p>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="mt-8">

          <h2 className="text-2xl font-bold text-white mb-4">
            Quick Actions
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div
              onClick={() =>
                navigate("/student/create")
              }
              className="
                bg-white/95
                backdrop-blur-sm
                rounded-3xl
                p-8
                shadow-xl
                cursor-pointer
                hover:scale-105
                transition
              "
            >
              <h3 className="text-2xl font-bold text-blue-600">
                Create Complaint
              </h3>

              <p className="text-slate-500 mt-2">
                Raise a new hostel complaint.
              </p>
            </div>

            <div
              onClick={() =>
                navigate("/student/complaints")
              }
              className="
                bg-white/95
                backdrop-blur-sm
                rounded-3xl
                p-8
                shadow-xl
                cursor-pointer
                hover:scale-105
                transition
              "
            >
              <h3 className="text-2xl font-bold text-green-600">
                My Complaints
              </h3>

              <p className="text-slate-500 mt-2">
                Track all submitted complaints.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>

</div>
  );
}

export default StudentDashboard;

