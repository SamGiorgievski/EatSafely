import axios from "axios";
import React from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import "./Layout.scss";
// import { Carousel } from "react-bootstrap";

const Layout = ({ isHomePage }) => {
  const { isLoggedIn, setIsLoggedIn } = useGlobalContext();
  const location = useLocation();
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const [text, count] = useTypewriter({
    words: ["Eat Smart", "Eat Healthy", "Eat Safely"],
    loop: true,
    delaySpeed: 3000,
    typeSpeed: 90,
  });

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
        navigate("/");
      })
      .catch((err) => {
        console.log("*****", err);
      });
  }

  return (
    <>
      <>
        <main>
          <body>
            <nav className="navbar navbar-expand-lg navbar-light">
              <div className="container-fluid">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
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

                  <ul className="navbar-nav ml-auto">
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
                          <Link className="nav-link" to="/recipes">
                            Recipes
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
                          <Link
                            to={"/"}
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
                <img
                  src="/images/eatsafely_logo.png"
                  alt="logo"
                  className="logo"
                />
                <h1 className="text-5xl lg:text-6xl font-semibold px-10">
                  <span className="mr-3">{text}</span>
                  <Cursor cursorColor="#999993" />
                </h1>
                <hr className="featurette-divider" />
                <div className="row featurette">
                  <div className="col-md-7 text-input">
                    <h2 className="featurette-heading">
                      Input your personal food intolerances.{" "}
                    </h2>
                    <p className="lead">
                      Signup and input your specfic food intolerances into your
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
                      intolerances. Simply take a photo the of ingredients label
                      of the item you want to check. The app will then scan the
                      image for the food intolerances and give you a result.
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
                      tell wait staff what your specfic food intolerances are.
                      Simply select a language and receive a result.
                    </p>
                  </div>
                  <div className="col-md-5 order-md-1">
                    <img
                      src="https://www.openaccessgovernment.org/wp-content/uploads/2020/02/dreamstime_xxl_141541565.jpg"
                      alt=""
                      className="picture"
                    />
                  </div>
                </div>
                <br />
                <hr className="featurette-divider" />
                <br />
                <div className="row featurette">
                  <div className="col-md-7 order-md-2 text-input">
                    <h2 className="featurette-heading">About Us. </h2>
                    <p className="lead">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Laboriosam quia eaque totam officia, iure, temporibus
                      dolores excepturi fugit deleniti corporis esse optio
                      accusantium necessitatibus natus. Impedit eos autem labore
                      consequuntur.
                    </p>
                  </div>
                  <div className="col-md-5 order-md-1">
                    <img
                      src="https://blog.advesa.com/wp-content/uploads/2019/11/about-us-page.png"
                      alt=""
                      className="picture"
                    />
                  </div>
                </div>
                <br />
                <hr className="featurette-divider" />
                <br />
              </div>
            )}
          </body>
        </main>
      </>
    </>
  );
};

export default Layout;
