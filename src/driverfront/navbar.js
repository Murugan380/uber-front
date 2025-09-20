import { useState } from "react";
import { NavLink } from "react-router-dom";

function UserNavbar(props) {
    const {name}=props;
    const n=name.charAt(0).toUpperCase() + name.slice(1);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <div className="d-flex align-items-center fixed-top justify-content-between bg-dark p-2">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-white text-decoration-none d-flex align-items-center"
        >
          <span className="fs-4 ms-3 fw-bold">Uber</span>
        </NavLink>

        {/* Desktop Nav + Username */}
        <div className="d-none d-lg-flex ms-5 align-items-center flex-grow-1 justify-content-between">
          {/* Left side links */}
          <ul className="nav">
            {[
              { to: "/driverhome", label: "Home", end: true },
              {to:"/drides",label:"Trip"},
              { to: "/dabout", label: "About" },
            ].map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `nav-link mx-1 custom-link ${isActive ? "active-link" : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right side username dropdown */}
          <div className="dropdown me-3">
            <button
              className="btn btn-dark dropdown-toggle text-white"
              type="button"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
             {n}
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end custom-dropdown"
              aria-labelledby="userDropdown"
            >
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `dropdown-item custom-dropdown-item ${
                      isActive ? "active-link" : ""
                    }`
                  }
                  to="/dprofile"
                >
                  View Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="dropdown-item custom-dropdown-item"
                  to="/driverlogout"
                >
                  Log out
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          className="btn btn-dark d-lg-none"
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* Sidebar Menu (Mobile) */}
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button
          className="btn-close btn-close-white m-3"
          onClick={() => setMenuOpen(false)}
        ></button>
        <ul className="nav flex-column p-3">
          {[
            { to: "/driverhome", label: "Home", end: true },
            {to:"/drides",label:"Trip"},
            { to: "/dabout", label: "About" },
          ].map((item) => (
            <li key={item.to} className="mb-2">
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `nav-link custom-link ${isActive ? "active-link" : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Username dropdown at bottom (Mobile) */}
        <div className="mt-auto p-3 border-top">
          <div className="dropdown w-100">
            <button
              className="btn btn-dark dropdown-toggle text-white w-100"
              type="button"
              id="userDropdownMobile"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {n}
            </button>
            <ul
              className="dropdown-menu custom-dropdown w-100"
              aria-labelledby="userDropdownMobile"
            >
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `dropdown-item custom-dropdown-item ${
                      isActive ? "active-link" : ""
                    }`
                  }
                  to="/dprofile"
                  onClick={() => setMenuOpen(false)}
                >
                  View Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="dropdown-item custom-dropdown-item"
                  to="/driverlogout"
                  onClick={() => setMenuOpen(false)}
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
    </>
  );
}

export default UserNavbar;
