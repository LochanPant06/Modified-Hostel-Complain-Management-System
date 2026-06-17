import { Router } from "express";
import {
  registerAdmin,
  loginAdmin,
  refreshAccessToken,
  logoutAdmin,
  getCurrentAdmin,
} from "../controllers/admin.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getAllComplaints } from "../controllers/complaint.controller.js";

const AdminRouter = Router();

AdminRouter.post("/register", registerAdmin);
AdminRouter.post("/login", loginAdmin);
AdminRouter.post("/refresh-token", refreshAccessToken);

AdminRouter.post("/logout", verifyJWT, logoutAdmin);
AdminRouter.get("/current-admin", verifyJWT, getCurrentAdmin);
AdminRouter.get("/complaints", verifyJWT, getAllComplaints);
export default AdminRouter;
