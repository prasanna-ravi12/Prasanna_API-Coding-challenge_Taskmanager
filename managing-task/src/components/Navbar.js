// src/components/Navbar.js
import React from "react";
import logo from "../assets/logo.jpg"; // Place your logo.jpg inside public or src/assets

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light px-3" style={{ backgroundColor: "#c2185b" }}>
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img src={logo} alt="QuitQ Logo" style={{ width: "40px" }} className="rounded-pill me-2" />
          <div>
            <span className="fw-bold">QuitQ</span><br />
            <small className="text-warning">Explore...</small>
          </div>
        </a>

        <form className="d-flex flex-grow-1 mx-4" role="search">
          <input className="form-control me-2" type="search" placeholder="Search for Products, Brands and More" />
          <button className="btn btn-primary" type="button">Search</button>
        </form>

        <ul className="navbar-nav d-flex flex-row align-items-center gap-3">
          <li className="nav-item dropdown">
            <a className="btn btn-outline-light dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
              <i className="fas fa-user"></i> Login
            </a>
            <ul className="dropdown-menu dropdown-menu-end p-3" style={{ minWidth: "250px" }}>
              <li className="mb-2"><strong>New User?</strong> <a href="/register" className="text-primary">Sign Up</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="/login">Login</a></li>
            </ul>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/cart">
              <i className="fas fa-shopping-cart"></i> Cart
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/seller">
              <i className="fas fa-store"></i> Become a Seller
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
