import { Router } from "express";

import { verifyJWT } from "../middleware/auth.middleware.js";

import {
  createComplaint,
  updateComplaintStatus,
  deleteComplaint,
  getAllComplaints,
  getMyComplaints,
} from "../controllers/complaint.controller.js";

import { verifyAdmin } from "../middleware/admin.middleware.js";

const complaintRoutes = Router();

complaintRoutes.post("/create", verifyJWT, createComplaint);

complaintRoutes.get("/my-complaints", verifyJWT, getMyComplaints);

complaintRoutes.get("/all", verifyJWT, verifyAdmin, getAllComplaints);

complaintRoutes.patch(
  "/:complaintId/status",
  verifyJWT,
  verifyAdmin,
  updateComplaintStatus,
);

complaintRoutes.delete("/:complaintId", verifyJWT, deleteComplaint);

export default complaintRoutes;
