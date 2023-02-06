import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Layout.scss";

const Layout = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg all--content">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a href="/">
              <img
                src="images/eatsafely_logo.png"
                height="30"
                alt="EatSafely Logo"
                loading="lazy"
              />
            </a>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/scanimage">
                  Scan Image
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center">
            <a className="link-secondary me-3" href="#">
              <i className="fas fa-shopping-cart"></i>
            </a>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
