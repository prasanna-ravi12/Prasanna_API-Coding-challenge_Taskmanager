import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  const adminEmail = localStorage.getItem("email");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-4">
      <div className="d-flex align-items-center">
        <Link className="navbar-brand" to="/addingtask">User Dashboard</Link>
        <Link className="btn btn-outline-light btn-sm ms-3" to="/usertasks">Users Tasks</Link>
      </div>

      <div className="ms-auto d-flex align-items-center text-white">
        <span className="me-3"><strong>Welcome, </strong> {adminEmail}</span>
        <Link to="/" className="btn btn-outline-light btn-sm">Logout</Link>
      </div>

      <style>{`
        .navbar {
          background: linear-gradient(90deg, #1e3c72, #2a5298);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          border-bottom: 2px solid #ffffff33;
        }
        .navbar-brand {
          font-weight: bold;
          font-size: 22px;
          color: #ffffff !important;
          letter-spacing: 1px;
        }
        .navbar .ms-auto {
          margin-left: auto !important;
        }
        .navbar .me-3 {
          margin-right: 15px;
          font-size: 14px;
          color: #f1f1f1;
          white-space: nowrap;
        }
        .navbar a.btn {
          border-radius: 20px;
          padding: 5px 15px;
          font-size: 13px;
          transition: all 0.3s ease;
        }
        .navbar a.btn:hover {
          background-color: #ffffff !important;
          color: #2a5298 !important;
          border-color: #ffffff !important;
        }
      `}</style>
    </nav>
  );
};

export default AdminNavbar;
