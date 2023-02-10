import axios from "axios";
import React from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import "./Layout.scss";
import { Carousel } from "react-bootstrap";

const Layout = ({ isHomePage }) => {
  const { isLoggedIn, setIsLoggedIn } = useGlobalContext();
  const location = useLocation();
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  function handleLogout() {
    axios
      .post("/logout", {
        email: isLoggedIn.userEmail,
        password: isLoggedIn.userPassword,
      })
      .then((response) => {
        console.log(response);
        sessionStorage.clear();
        setIsLoggedIn(false);
        navigate("/login");
      })
      .catch((err) => {
        console.log("*****", err);
      });
  }

  return (
    <>
      <main>
        <nav className="navbar navbar-expand-lg navbar--style">
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

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <a href="/">
                <img
                  src="images/cropped.png"
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
                      <Link className="nav-link" to="/scanimage">
                        Scan Image
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/travelcard">
                        Travel Cards
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/profile">
                        Profile
                      </Link>
                    </li>

                    <li className="nav-item">
                      {/* Double Check This! */}
                      <Link
                        to={"./login"}
                        className="nav-link"
                        onClick={handleLogout}
                        type="submit"
                      >
                        Logout
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <Outlet />
        {location.pathname === "/" && (
          <div className="container marketing">
            <img src="/images/eatsafely_logo.png" alt="logo" className="logo" />
            <Carousel activeIndex={index} onSelect={handleSelect}>
              <Carousel.Item>
                <img
                  className="picture"
                  src="images/edit-pic.png"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>Input your personal food intolerances. </h3>
                  <p>
                    {" "}
                    Signup and input your specific food intolerances into your
                    profile
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="picture"
                  src="https://www.boldbusiness.com/wp-content/uploads/2017/02/Food-scanning-apps-for-nutritional-oversight-e1493732402445.jpg"
                  alt="Second slide"
                />

                <Carousel.Caption>
                  <h3>
                    Scan food ingredient labels based on your food intolerance
                    input.{" "}
                  </h3>
                  <p>
                    Once you have created an account and input your food
                    intolerances. Simply take a photo of the ingredients label
                    of the item you want to check. The app will then scan the
                    image for the food intolerances and give you a result.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="picture"
                  src="images/travel-card.png"
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>Traveling Abroad?</h3>
                  <p>
                    The EatSafely application can make you a resturant card to
                    tell wait staff what your specific food intolerances are.
                    Simply select a language and receive a result.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        )}
      </main>
    </>
  );
};

export default Layout;
