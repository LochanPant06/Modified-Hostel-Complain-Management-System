# Modified-Hostel-Complain-Management-System

A full‑stack web application that lets students submit hostel complaints and admins manage, track, and resolve them.

---

## Demo
Add screenshots or a live demo URL here (optional).

---

## Tech stack
- Backend: Node.js, Express
- Database: MongoDB, Mongoose
- Auth & security: bcrypt, JSON Web Tokens (access + refresh), cookie-based auth, CORS, dotenv
- Frontend: React, Vite, React Router, Tailwind CSS
- HTTP client: Axios

---

## Key features
- Student registration and login with secure password hashing
- JWT access + refresh token authentication stored in cookies
- Role-based authorization (student vs admin)
- Students: create, view, and delete their complaints
- Admins: view all complaints, update complaint status (Pending → In Progress → Resolved/Rejected)
- Clean, consistent API responses using a centralized `ApiResponse` wrapper
- Responsive UI with dashboards and protected routes

---

## Repo structure (high level)
- Backend
  - `src/controllers/` — request handlers (student, admin, complaint)
  - `src/models/` — Mongoose schemas (Student, Admin, Complaint)
  - `src/middleware/` — auth.middleware.js, admin.middleware.js
  - `src/routes/` — route definitions for students, admins, complaints
  - `src/db/` — MongoDB connection
  - `src/app.js`, `src/index.js`
  - `utils/` — `ApiResponse`, error helpers, async handler
- Frontend
  - `src/pages/` — Login, Register, Student/Admin dashboards, CreateComplaint, MyComplaints
  - `src/components/` — Navbar, ProtectedRoute, Loader
  - `src/api/axios.js` — Axios instance configured with `withCredentials`
  - Vite + Tailwind CSS setup

---

## Quick start

Prerequisites:
- Node.js (v16+)
- MongoDB (local or cloud)

Backend
```bash
cd Backend
cp .env.example .env   # create .env and fill values
npm install
npm run dev            # starts server (nodemon)
```

Frontend
```bash
cd Frontend
npm install
npm run dev            # starts Vite dev server (http://localhost:5173)
```

---

## Example environment variables (.env)
```
PORT=3000
MONGODB_URI=<your-mongodb-uri>
DB_NAME=hostel_hcms
ACCESS_TOKEN_SECRET=<random-secret>
REFRESH_TOKEN_SECRET=<random-secret>
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
NODE_ENV=development
```

---

## API endpoints (summary)

Auth / Students
- `POST /api/v1/students/register` — register a student
- `POST /api/v1/students/login` — login (sets `accessToken` and `refreshToken` cookies)
- `POST /api/v1/students/refresh-token` — refresh access token
- `POST /api/v1/students/logout` — logout (clears cookies)
- `GET  /api/v1/students/current-student` — get current student (auth required)

Admin
- `POST /api/v1/admins/register` — register admin
- `POST /api/v1/admins/login` — admin login
- `POST /api/v1/admins/refresh-token` — refresh admin access token
- `GET  /api/v1/admins/current-admin` — get current admin (auth required)

Complaints
- `POST   /api/v1/complaints/create` — create a complaint (student)
- `GET    /api/v1/complaints/my-complaints` — fetch logged-in student complaints
- `GET    /api/v1/complaints/all` — fetch all complaints (admin only)
- `PATCH  /api/v1/complaints/:complaintId/status` — update complaint status (admin only)
- `DELETE /api/v1/complaints/:complaintId` — delete complaint (student owner only)

---

## Implementation Notes
- Passwords hashed via `bcrypt` in Mongoose pre-save hooks.
- Refresh tokens are generated and stored per-user in DB; refresh flow compares incoming cookie to DB value.
- `verifyJWT` middleware reads `accessToken` from cookies or `Authorization` header and attaches `req.user`.
- `verifyAdmin` middleware allows only users with admin role for protected admin routes.
- Frontend `ProtectedRoute` uses `localStorage` role flag to restrict navigation (frontend check complements backend auth).
