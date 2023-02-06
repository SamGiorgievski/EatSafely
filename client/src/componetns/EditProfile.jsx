import React, { useState } from "react";
import axios from "axios";
import "./EditProfile.scss";

const EditProfile = (props) => {
  const [user, setUser] = useState(props.user || "");

  function updateUser() {
    const first_name = user.firstName;
    const last_name = user.lastName;
    const email = user.userEmail;
    const password = user.userPassword;

    console.log(user);

    return axios
      .post("/update", {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.userEmail,
        password: user.userPassword,
      })
      .then((response) => {
        console.log(response);
      });
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Edit Profile</h3>
        </div>
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

          {/* Intolerances */}
          <div className="form-outline mb-4">
            <input
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
              Intolerances
            </label>
          </div>
        </form>
        <div className="modal-footer">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={updateUser}
          >
            Save Changes
          </button>
          <button onClick={props.toggle} className="btn btn-primary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
