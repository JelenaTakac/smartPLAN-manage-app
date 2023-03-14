import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__center">
        <Link to="/" className="logo">
          <h1>
            <span className="text-primary">smart</span>PLAN
          </h1>
        </Link>
        <ul className="navbar__list">
          <li>
            <Link to="/" className="navbar__link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/employee" className="navbar__link">
              Employee
            </Link>
          </li>
          <li>
            <Link to="/task" className="navbar__link">
              Task
            </Link>
          </li>
          <li>
            <Link to="/meeting" className="navbar__link">
              Meeting
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
