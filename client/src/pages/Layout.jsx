import axios from "axios";
import React from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import "./Layout.scss";

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
        setIsLoggedIn(false);
        localStorage.clear();

        navigate("/");
      })
      .catch((err) => {
        console.log("*****", err);
      });
  }

  return (
    <>
      <>
        <div className="main--body">
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
            <div className="container-marketing">
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
                    Once your profile has been created, you can customize your
                    account with preset food intolerances and/or input
                    individual ingredients.
                  </p>
                </div>
                <div className="col-md-5">
                  <img
                    src="images/edit_screen.png"
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
                    Once your profile has been customized, simply take a photo
                    of the ingredients label of the item you want to check. The
                    app will then scan the image, compare it with your
                    intolerances, and let you know if it's safe or not.
                  </p>
                </div>
                <div className="col-md-5 order-md-1">
                  <img src="images/scan_image.png" alt="" className="picture" />
                </div>
              </div>
              <br />

              <br />
              <hr className="featurette-divider" />
              <br />
              <div className="row featurette">
                <div className="col-md-7 text-input">
                  <h2 className="featurette-heading">Not sure what to eat? </h2>
                  <p className="lead">
                    With the random recipe generator you'll have an easier time
                    selecting a meal based on your dietary needs.
                  </p>
                </div>
                <div className="col-md-5">
                  <img
                    src="images/recipes.png"
                    alt="edit-pic"
                    className="picture"
                  />
                </div>
              </div>
              <br />
              <hr className="featurette-divider" />
              <br />
              <div className="row featurette">
                <div className="col-md-5 order-md-2 text-input">
                  <h2 className="featurette-heading">Traveling Abroad? </h2>
                  <p className="lead">
                    The EatSafely application will generate a card in many
                    different languages to help you communicate your
                    intolerances to restaurants around the world
                  </p>
                </div>
                <div className="col-md-5">
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
                <div className="col-md-7 text-input">
                  <h2 className="featurette-heading">About Us </h2>
                  <p className="lead">
                    Sam Giorgievski, Brad Williams and Dihni Hassan came together to create EatSafely after personal struggles navigating a world unfit to suit their dietary needs. Sam and Brad live with celiac disease, and Dihni is dairy-free and eats halal. We are inspired by tough journeys of people with allergies, intolerances, and diseases trying to live a normal life. The world is a step behind catering the needs of those of need, and we're here to make it easier. Through our personal journeys, it was the community that always came together to help us and guide us. And now, it is our turn to give back. Our mission, and everything that we work for comes down to one basic idea: Everyone should feel safe eating everywhere.
                  </p>
                </div>
                <div className="col-md-5 ">
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
        </div>
      </>
    </>
  );
};

export default Layout;
