import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.scss";

const Profile = (props) => {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    axios
      .post("/profile")
      .then((response) => {
        setUserData(response.data.rows[0]);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  }, []);

  return (
    <section className="bg-light">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mb-4 mb-sm-5">
            <div className="card card-style1 border-0">
              <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                <div className="row align-items-center">
                  <div className="col-lg-6 mb-4 mb-lg-0">
                    <img
                      className="img"
                      src="https://files.worldwildlife.org/wwfcmsprod/images/Takeaway_graphic_Summer_2019/story_full_width/4mhxvgukpd_Takeaway_graphic_Summer_2019.png"
                      alt="..."
                    />
                  </div>
                  <div className="col-lg-6 px-xl-10">
                    <div className="bg-primary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                      <h3 className="h2 text-white mb-0">{`${userData.first_name} ${userData.last_name}`}</h3>
                    </div>
                    <ul className="list-unstyled mb-1-9">
                      <li className="mb-2 mb-xl-3 display-28">
                        <span className="display-26 text-secondary me-2 font-weight-600">
                          Email:
                        </span>{" "}
                        {userData.email}
                      </li>
                      <li className="mb-2 mb-xl-3 display-28">
                        <span className="display-26 text-secondary me-2 font-weight-600">
                          First Name:
                        </span>{" "}
                        {userData.first_name}
                      </li>
                      <li className="mb-2 mb-xl-3 display-28">
                        <span className="display-26 text-secondary me-2 font-weight-600">
                          Last Name:
                        </span>{" "}
                        {userData.last_name}
                      </li>
                      <li className="mb-2 mb-xl-3 display-28">
                        <span className="display-26 text-secondary me-2 font-weight-600">
                          Intolerances:
                        </span>{" "}
                        [This will be the intolerances]
                      </li>
                      <li className="display-28">
                        <button className="btn btn-primary">
                          Edit Profile
                        </button>
                      </li>
                    </ul>
                    <ul className="social-icon-style1 list-unstyled mb-0 ps-0">
                      <li>
                        <a href="#!">
                          <i className="ti-twitter-alt"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="ti-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="ti-pinterest"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="ti-instagram"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
