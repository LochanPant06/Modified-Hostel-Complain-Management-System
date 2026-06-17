import { Router } from "express";
import {
  registerStudent,
  loginStudent,
  refreshAccessToken,
  logoutStudent,
  getCurrentStudent
} from "../controllers/student.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const studentRouter = Router();

studentRouter.post("/register", registerStudent);

studentRouter.post("/login", loginStudent);

studentRouter.post("/refresh-token", refreshAccessToken);

studentRouter.post("/logout", verifyJWT, logoutStudent);

studentRouter.get("/current-student", verifyJWT,getCurrentStudent);

export default studentRouter;
