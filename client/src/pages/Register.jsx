import React, { useState } from "react";
import "./Register.scss";
import axios from "axios";
import { Link } from "react-router-dom";
// import { useGlobalContext } from "../context";

function Register(props) {
  const [user, setUser] = useState(props.user || "");
  // const { isLoggedIn, setIsLoggedIn } = useGlobalContext();

  // const navigate = useNavigate();

  function registerUser() {
    const first_name = user.firstName;
    const last_name = user.lastName;
    const email = user.userEmail;
    const password = user.userPassword;

    axios
      .post("/register", {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.userEmail,
        password: user.userPassword,
      })
      .then((response) => {
        console.log(response);
        // navigate("/profile");
        // // setIsLoggedIn(true);
      });
  }

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
                <h2 className="fw-bold mb-5">Sign up now</h2>

                {/* Form */}
                <form method="POST" action="/register">
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        {/* First name */}
                        <input
                          type="text"
                          name="first_name"
                          for="first_name"
                          id="form3Example1"
                          className="form-control"
                          onChange={(event) =>
                            setUser((prev) => ({
                              ...prev,
                              firstName: event.target.value,
                            }))
                          }
                        />
                        <label className="form-label" for="first_name">
                          First name
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        {/* Last Name */}
                        <input
                          type="text"
                          name="last_name"
                          for="last_name"
                          id="form3Example2"
                          className="form-control"
                          onChange={(event) =>
                            setUser((prev) => ({
                              ...prev,
                              lastName: event.target.value,
                            }))
                          }
                        />
                        <label className="form-label" for="last_name">
                          Last name
                        </label>
                      </div>
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
                    onClick={(event) => {
                      event.preventDefault();
                      registerUser();
                      // setIsLoggedIn(true);
                    }}
                  >
                    Sign up
                  </button>
                </form>
                <Link to="/login" variant="body2">
                  Already have an account? Log In here
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

export default Register;
