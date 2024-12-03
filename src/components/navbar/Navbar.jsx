// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"; // Optional, for styling

const   Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/taskForm" className="navbar-link">
          Add Task
        </Link>
        <Link to="/taskList" className="navbar-link">
          Task List
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
