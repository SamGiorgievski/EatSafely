import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Profile from "./Profile";

import "./Login.scss";

function Login(props) {
  const [user, setUser] = useState("");
  // const [password, setPassword] = useState("");

  // console.log("email", email)

  function handleSubmit() {
    return axios
      .post("/login", {
        email: user.userEmail,
        password: user.userPassword,
      })
      .then((response) => {
        console.log(response);
      });
  }

  console.log(user);

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
                <form method="POST" action="/login">
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
                    onClick={handleSubmit}
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
        </div>
      </div>
    </section>
  );
}

export default Login;
