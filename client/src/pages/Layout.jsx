import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-white">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-bars"></i>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <img
              src="images/eatsafely_logo.png"
              height="30"
              alt="EatSafely Logo"
              loading="lazy"
            />

            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to="/scanimage">
                  Scan Image
                </Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          <div class="d-flex align-items-center">
            <a class="link-secondary me-3" href="#">
              <i class="fas fa-shopping-cart"></i>
            </a>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
