import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { useDataProvider } from "../../useContext/usecontext";
import "boxicons";
import "./Sidebar.css";

const Topbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
const { isSidebarOpen, setIsSidebarOpen } = useDataProvider()
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  const handleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="navbar">
      <div className="container" style={{ margin: "0 5px", padding: "0px" }}>
        <div className="d-flex text-align-center">
          <div className="d-flex text-align-center" onClick={handleSideBar}>
            <div>
              <button
                className={`menu ${isSidebarOpen ? "opened" : ""}`}
                aria-label="Main Menu"
                aria-expanded={isSidebarOpen}
              >
                <svg width="40" height="40" viewBox="0 0 100 100">
                  <path
                    className="line line1"
                    d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                  />
                  <path className="line line2" d="M 20,50 H 80" />
                  <path
                    className="line line3"
                    d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="logo">
            <Logo />
          </div>
        </div>

        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements ${showNavbar ? "active" : ""}`}>
          <ul>
            <li>
              <NavLink to="/contact" activeClassName="active">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const Hamburger = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="52"
    height="24"
    viewBox="0 0 52 24"
  >
    <g transform="translate(-294 -47)">
      <rect
        width="42"
        height="4"
        rx="2"
        transform="translate(304 47)"
        fill="#574c4c"
      />
      <rect
        width="42"
        height="4"
        rx="2"
        transform="translate(304 67)"
        fill="#574c4c"
      />
      <rect
        width="52"
        height="4"
        rx="2"
        transform="translate(294 57)"
        fill="#574c4c"
      />
    </g>
  </svg>
);

const Logo = () => (
  <svg
    width="170"
    height="41"
    viewBox="0 0 170 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Add your logo SVG path */}
    <text x="10" y="30" fontSize="24" fill="#2F234F">
      Logo
    </text>
  </svg>
);

export default Topbar;
