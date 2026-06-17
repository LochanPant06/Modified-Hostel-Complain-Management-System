import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const role = localStorage.getItem("role");

      const endpoint = role === "admin" ? "/admins/logout" : "/students/logout";

      await api.post(endpoint);

      localStorage.removeItem("role");

      toast.success("Logged Out Successfully");

      navigate("/");
    } catch (error) {
      console.error(error);

      toast.error("Logout Failed");
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 mb-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">Hostel Portal</h1>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/student/dashboard")}
            className="
              bg-blue-500
              hover:bg-blue-600
              text-white
              px-5
              py-2
              rounded-xl
              font-medium
              transition
            "
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/student/create")}
            className="
              bg-green-500
              hover:bg-green-600
              text-white
              px-5
              py-2
              rounded-xl
              font-medium
              transition
            "
          >
            Create Complaint
          </button>

          <button
            onClick={() => navigate("/student/complaints")}
            className="
              bg-amber-500
              hover:bg-amber-600
              text-white
              px-5
              py-2
              rounded-xl
              font-medium
              transition
            "
          >
            My Complaints
          </button>

          <button
            onClick={handleLogout}
            className="
    bg-red-500
    hover:bg-red-600
    text-white
    px-5
    py-2
    rounded-xl
  "
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
