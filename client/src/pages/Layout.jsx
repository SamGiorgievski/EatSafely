import axios from "axios";
import React from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import "./Layout.scss";
import { Carousel } from "react-bootstrap";


const Layout = () => {
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
                      <Link className="nav-link" to="/travel">
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
            {/* <hr className="featurette-divider" /> */}
            {/* <div className="row featurette">
              <div className="col-md-7 text-input">
                <h2 className="featurette-heading">
                  Input your personal food intolerances.{" "}
                </h2>
                <p className="lead">
                  Signup and input your specific food intolerances into your
                  profile
                </p>
              </div>
              <div className="col-md-5">
                <img
                  src="images/edit-pic.png"
                  alt="edit-pic"
                  className="picture"
                />
              </div>
            </div>
            <br />
            <hr className="featurette-divider" />
            <br />
            <div className="row featurette">           
              <div className="col-md-7 order-md-2 text-input">
                <h2 className="featurette-heading">
                  Scan food ingredient labels based on your food intolerance
                  input.{" "}
                </h2>
                <p className="lead">
                  Once you have created an account and input your food
                  intolerances. Simply take a photo of the ingredients label of
                  the item you want to check. The app will then scan the image
                  for the food intolerances and give you a result.
                </p>
              </div>
              <div className="col-md-5 order-md-1">
                <img
                  src="https://www.boldbusiness.com/wp-content/uploads/2017/02/Food-scanning-apps-for-nutritional-oversight-e1493732402445.jpg"
                  alt=""
                  className="picture"
                />
              </div>
            </div>
            <br />
            <hr className="featurette-divider" />
            <br />
            <div className="row featurette">
              <div className="col-md-7 text-input">
                <h2 className="featurette-heading">Traveling Abroad? </h2>
                <p className="lead">
                  The EatSafely application can make you a resturant card to
                  tell wait staff what your specific food intolerances are.
                  Simply select a language and receive a result.
                </p>
              </div>
              <div className="col-md-5">
                <svg
                  className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                  width="500"
                  height="500"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Placeholder: 500x500"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                >
                  <title>Placeholder</title>
                  <rect width="100%" height="100%" fill="#eee" />
                  <text x="50%" y="50%" fill="#aaa" dy=".3em">
                    500x500
                  </text>
                </svg>
              </div>
            </div>
            <br /> */}
            {/* <hr className="featurette-divider" /> */}
            {/* <br /> */}

<Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="picture"
          src="images/edit-pic.png"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Input your personal food intolerances.{" "}</h3>
          <p> Signup and input your specific food intolerances into your
                  profile</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="picture"
          src="https://www.boldbusiness.com/wp-content/uploads/2017/02/Food-scanning-apps-for-nutritional-oversight-e1493732402445.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
        <div className="text-input">
          <h3>Scan food ingredient labels based on your food intolerance
                  input.{" "}</h3>        
          <p>Once you have created an account and input your food
                  intolerances. Simply take a photo of the ingredients label of
                  the item you want to check. The app will then scan the image
                  for the food intolerances and give you a result.</p>
                  </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="col-md-5 order-md-1"
          src="holder.js/800x400?text=Second slide&bg=282c34"
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
        <br />
        <footer className="container">
          <p className="float-end">
            <a href="#">Back to top</a>
          </p>
          <p>&copy; 2023 EatSafely.</p>
        </footer>
      </main>
    </>
  );
};

export default Layout;
