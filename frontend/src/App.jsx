import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddClient from "./components/AddClient";
import EditClient from "./components/EditClient";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-client" element={<AddClient />} />
        <Route path="/edit-client/:id" element={<EditClient />} />
      </Routes>
    </Router>
  );
}

export default App;
