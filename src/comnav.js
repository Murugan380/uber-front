import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './comnav.css'
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar fixed-top">
      <div className="nav-container d-flex align-items-center justify-content-between w-100">
        {/* Logo */}
        <div className="nav-logo">Uber</div>

        {/* ✅ Menu Button aligned to right */}
        <div className="ms-auto">
          <div className="dropdown">
            <button
              className="btn btn-outline-dark dropdown-toggle text-white"
              type="button"
              id="menuDropdown"
              data-bs-toggle="dropdown"
              aria-expanded={dropdownOpen ? "true" : "false"}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
             ☰ 
            </button>
            <ul
              className={`dropdown-menu dropdown-menu-end custom-dropdown ${
                dropdownOpen ? "show" : ""
              }`}
              aria-labelledby="menuDropdown"
            >
              <li>
                <NavLink
                  to="/driverlog"
                  className={({ isActive }) =>
                    `dropdown-item custom-dropdown-item ${
                      isActive ? "active-link" : ""
                    }`
                  }
                  onClick={() => setDropdownOpen(false)}
                >
                  Driver Log
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/userlog"
                  className={({ isActive }) =>
                    `dropdown-item custom-dropdown-item ${
                      isActive ? "active-link" : ""
                    }`
                  }
                  onClick={() => setDropdownOpen(false)}
                >
                  User Log
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Hamburger menu (mobile) */}
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </div>
      </div>
    </nav>
  );
}
