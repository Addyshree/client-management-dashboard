// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
// import Dashboard from "./components/Dashboard";
// import AddClient from "./components/AddClient";
// import EditClient from "./components/EditClient";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/add-client" element={<AddClient />} />
//         <Route path="/edit-client/:id" element={<EditClient />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddClient from "./components/AddClient";
import EditClient from "./components/EditClient";
import Header from "./components/Header"; // New component

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-client"
          element={
            <ProtectedRoute>
              <AddClient />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-client/:id"
          element={
            <ProtectedRoute>
              <EditClient />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
