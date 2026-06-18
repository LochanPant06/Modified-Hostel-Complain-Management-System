# Modified-Hostel-Complain-Management-System

A full-stack web application that enables students to submit hostel complaints and allows administrators to efficiently manage, track, and resolve them through a centralized dashboard.

---

## Live Demo

Frontend: https://modified-hostel-complain-management.vercel.app

Backend API: https://modified-hostel-complain-management-nvsg.onrender.com

---

## Tech Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication & Security

* JWT Authentication (Access Token + Refresh Token)
* HTTP-Only Cookies
* bcrypt Password Hashing
* Role-Based Access Control (RBAC)
* CORS
* dotenv

### Deployment

* Vercel (Frontend)
* Render (Backend)
* MongoDB Atlas (Database)

---

## Architecture

```text
Student / Admin
        │
        ▼
React + Vite Frontend
        │
        ▼
Axios API Requests
        │
        ▼
Express.js REST API
        │
        ▼
JWT Authentication
        │
        ▼
MongoDB Atlas
```

---

## Key Features

### Student Features

* Student registration and login
* Secure authentication using JWT
* Create complaints
* View personal complaints
* Delete submitted complaints
* Track complaint status

### Admin Features

* Admin registration and login
* View all complaints
* Update complaint status
* Manage complaint workflow
* Monitor complaint resolution process

### System Features

* Role-Based Access Control (RBAC)
* JWT Access & Refresh Token Authentication
* Protected Routes
* Secure Cookie-Based Authentication
* Responsive User Interface
* Cloud Deployment

---

## Security Features

* Password hashing using bcrypt
* JWT Access & Refresh Token authentication
* HTTP-only cookies for secure token storage
* Role-Based Access Control (RBAC)
* Protected API routes
* CORS configuration for secure cross-origin communication
* Environment variable management using dotenv
* Backend authorization through JWT verification middleware

---

## Project Highlights

* Developed 15+ RESTful API endpoints
* Implemented JWT Authentication with Refresh Token workflow
* Designed role-based access control for Students and Admins
* Built complete CRUD functionality for complaint management
* Integrated MongoDB Atlas for cloud database management
* Deployed full-stack application using Vercel and Render

---

## Repository Structure

### Backend

```text
Backend/
│
├── src/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── routes/
│   ├── db/
│   ├── utils/
│   ├── app.js
│   └── index.js
│
├── package.json
└── .env
```

### Frontend

```text
Frontend/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── vite.config.js
```

---

## Quick Start

### Prerequisites

* Node.js (v16+)
* MongoDB Atlas Account

### Backend Setup

```bash
cd Backend

npm install

npm run dev
```

### Frontend Setup

```bash
cd Frontend

npm install

npm run dev
```

Application runs at:

```text
Frontend:
http://localhost:5173

Backend:
http://localhost:3000
```

---

## Environment Variables

### Backend (.env)

```env
PORT=3000

MONGODB_URI=<your-mongodb-uri>

ACCESS_TOKEN_SECRET=<your-secret>

ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=<your-secret>

REFRESH_TOKEN_EXPIRY=10d

NODE_ENV=development
```

---

## API Endpoints

### Student Authentication

| Method | Endpoint                         |
| ------ | -------------------------------- |
| POST   | /api/v1/students/register        |
| POST   | /api/v1/students/login           |
| POST   | /api/v1/students/refresh-token   |
| POST   | /api/v1/students/logout          |
| GET    | /api/v1/students/current-student |

### Admin Authentication

| Method | Endpoint                     |
| ------ | ---------------------------- |
| POST   | /api/v1/admins/register      |
| POST   | /api/v1/admins/login         |
| POST   | /api/v1/admins/refresh-token |
| GET    | /api/v1/admins/current-admin |

### Complaint Management

| Method | Endpoint                               |
| ------ | -------------------------------------- |
| POST   | /api/v1/complaints/create              |
| GET    | /api/v1/complaints/my-complaints       |
| GET    | /api/v1/complaints/all                 |
| PATCH  | /api/v1/complaints/:complaintId/status |
| DELETE | /api/v1/complaints/:complaintId        |

---

## Implementation Notes

* Passwords are hashed using bcrypt before storage.
* Refresh Tokens are stored securely in the database.
* Access Tokens are verified through JWT middleware.
* HTTP-only cookies are used for secure token transmission.
* Frontend Protected Routes provide UI-level access restriction.
* Backend JWT verification acts as the primary authorization layer.
* API responses are standardized using a centralized ApiResponse utility.

---

## Future Enhancements

* Complaint image upload support
* User Id Card Verification
* Email notifications on complaint status updates
* Real-time notifications using Socket.io
* Complaint category management
* Progressive Web App (PWA) support
* Multi-hostel support for larger institutions

---

## Author

**Lochan Pant**

B.Tech Mechanical Engineering, NIT Uttarakhand

Aspiring Software Engineer | MERN Stack Developer | Problem Solver
