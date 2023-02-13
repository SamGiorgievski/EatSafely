import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./Login.scss";
import { useGlobalContext } from "../context";

function Login(props) {
  const [user, setUser] = useState("");

  const { isLoggedIn, setIsLoggedIn } = useGlobalContext();
  const { storedData, setStoredData } = useGlobalContext();

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    console.log("LoginHandle");
    return axios
      .post("/login", {
        email: user.userEmail,
        password: user.userPassword,
      })
      .then((response) => {
        localStorage.setItem("userData", JSON.stringify(response));

        // props.setStoredData(JSON.parse(localStorage.getItem("userData")));
        console.log("---------------");
        // console.log(response);
        setIsLoggedIn(true);

        navigate("/profile");
      })
      .catch((err) => {
        console.log("*****", err);
      });
  }

  // console.log(userData.user);

  return (
    <section className="text-center text-lg-start">
      <img
        src="images/eatsafely_logo.png"
        alt="page-img"
        className="logo"
      ></img>

      <div className="container py-4">
        <div className="row g-0 align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="card cascading-right">
              <div className="card-body p-5 shadow-5 text-center">
                <h2 className="fw-bold mb-5">Please Log In</h2>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline"></div>
                    </div>
                  </div>
                  <div className="form-outline mb-4">
                    {/* Email */}
                    <input
                      type="email"
                      name="email"
                      for="email"
                      id="form3Example3"
                      className="form-control"
                      // onChange={(event) => setEmail(event.target.value)}
                      onChange={(event) =>
                        setUser((prev) => ({
                          ...prev,
                          userEmail: event.target.value,
                        }))
                      }
                    />
                    <label className="form-label" for="email">
                      Email address
                    </label>
                  </div>

                  {/* Password */}
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      name="password"
                      for="password"
                      id="form3Example4"
                      className="form-control"
                      // onChange={(event) => setPassword(event.target.value)}

                      onChange={(event) =>
                        setUser((prev) => ({
                          ...prev,
                          userPassword: event.target.value,
                        }))
                      }
                    />
                    <label className="form-label" for="password">
                      Password
                    </label>
                  </div>

                  {/* Form Event Handler */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                  >
                    Login
                  </button>
                </form>
                <Link to="/register" variant="body2">
                  Don't have an account? Sign up here
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-5 mb-lg-0">
            <img
              src="https://my-doc.com/wp-content/uploads/2020/08/harvardhealth.jpg"
              className="w-100 rounded-4 shadow-4"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
