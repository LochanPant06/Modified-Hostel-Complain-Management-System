import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import studentRouter from "./routes/student.route.js";
import adminRouter from "./routes/admin.route.js";
import complaintRoutes from "./routes/complaint.routes.js";

const app = express();

app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   }),
// );

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://modified-hostel-complain-management.vercel.app",
    ],
    credentials: true,
  })
);

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
