import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import studentRouter from "./routes/student.route.js";
import adminRouter from "./routes/admin.route.js";
import complaintRoutes from "./routes/complaint.routes.js";

const app = express();
const clientUrl = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.trim().replace(/\/$/, "")
  : "";
const corsOptions = {
  origin: clientUrl || false,
  credentials: true,
};

console.log("CLIENT_URL from env:", process.env.CLIENT_URL);
console.log("CLIENT_URL used by CORS:", clientUrl || "(missing)");

// Express 5 uses `/{*splat}` instead of `*` for a catch-all route.
app.options("/{*splat}", cors(corsOptions));
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json({ limit: "16kb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use("/api/v1/students", studentRouter);
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/complaints", complaintRoutes);

export { app };
