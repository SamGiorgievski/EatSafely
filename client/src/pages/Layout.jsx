import axios from "axios";
import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";

const Layout = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useGlobalContext();
  // const location = useLocation();

  // const page = location.pathname;

  const navigate = useNavigate();

  console.log(isLoggedIn);

  function handleLogout() {
    axios
      .post("/logout", {
        email: isLoggedIn.userEmail,
        password: isLoggedIn.userPassword,
      })
      .then((response) => {
        console.log(response);
        setIsLoggedIn(false);
        navigate("/login");
      })
      .catch((err) => {
        console.log("*****", err);
      });
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
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
              {!isLoggedIn && (
                <>
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
                </>
              )}
              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="btn btn-primary" to="/scanimage">
                      Scan Image
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-primary" to="/profile">
                      Profile
                    </Link>
                  </li>

                  <li className="nav-item">
                    {/* Double Check This! */}
                    <Link to={"./login"}>
                      <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </Link>
                  </li>
                </>
              )}
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
