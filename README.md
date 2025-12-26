# Prydan Client Management Dashboard

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing recruitment clients efficiently. Built with a clean, professional dashboard interface to add, edit, view, and delete client records.

Live Demo: [https://client-management-dashboard-1.onrender.com/](https://client-management-dashboard-1.onrender.com/)

Backend API: [https://client-management-dashboard-a163.onrender.com/](https://client-management-dashboard-a163.onrender.com/)

## Features

- User Authentication (Register & Login with JWT)
- Secure Protected Routes (Dashboard accessible only after login)
- Add New Clients
- Edit Existing Client Details
- View All Clients in a Responsive Table
- Search Clients by Name, Email, Company, Industry, or Location
- Sort Clients by Name, Email, Company, or Date Added
- Delete Clients with Confirmation
- Client Details Include:
  - Full Name, Email, Company, Phone
  - Status (Onboarding, Active, On-Hold, Contract Ended)
  - Service Type (Permanent Recruitment, Contract Staffing, RPO)
  - Industry (IT, Finance, Healthcare, Other)
  - Location (India, UK, USA, Other)

## Tech Stack

### Frontend
- React.js (with Vite)
- React Router DOM (Client-side routing)
- React Bootstrap + Bootstrap Icons
- Axios for API calls
- React Toastify for notifications

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Validator for input validation

### Deployment
- Frontend: Render (Static Site)
- Backend: Render (Web Service)
- Database: MongoDB Atlas

## Project Structure
client-management-dashboard/
├── frontend/                # React Frontend (Vite)
│   ├── src/
│   │   ├── components/      # Dashboard, AddClient, EditClient, Login, Header
│   │   ├── services/        # Axios API INSTANX
│   │   └── App.jsx
│   └── vite.config.js
│
├── backend/                 # Express Backend
│   ├── models/              # Mongoose schemas (Client, User)
│   ├── routes/              # API routes (auth, clients)
│   ├── middleware/          # Authentication middleware
│   ├── controllers/         # Route handlers
│   └── server.js            # Main server file
│
└── README.md


## Local Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### Installation

1. Clone the repository

git clone https://github.com/your-username/client-management-dashboard.git
cd client-management-dashboard

2.Install dependencies for both frontend and backend

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

3. Create .env files

In server/.env:

MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_strong_secret_key
PORT=5000

In client/.env:
VITE_API_URL=http://localhost:5000

Run the application

# Start backend (from server directory)
npm start

# Start frontend (from client directory, in a new terminal)
npm run dev

Open http://localhost:5173 to view the app.
Default login after registration works immediately.
Deployment
The app is deployed using Render:

Frontend: Static Site connected to the client folder
Backend: Web Service connected to the server folder

Environment variables are set directly in Render dashboard:

VITE_API_URL → Backend live URL
MONGO_URI and JWT_SECRET → In backend service
