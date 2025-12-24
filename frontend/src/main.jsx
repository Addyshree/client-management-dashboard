// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "bootstrap/dist/css/bootstrap.min.css";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css"; // New for toasts
import { ToastContainer } from "react-toastify"; // New

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <ToastContainer position="top-right" autoClose={3000} />
  </React.StrictMode>
);

// Add Google Fonts (Roboto for modern sans-serif)
const link = document.createElement("link");
link.href =
  "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);
