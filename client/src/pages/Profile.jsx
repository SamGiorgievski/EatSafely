import React, { useState } from "react";
import axios from "axios";
import "./Profile.scss";

const Profile = (props) => {
  return (
    <section class="bg-light">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 mb-4 mb-sm-5">
            <div class="card card-style1 border-0">
              <div class="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                <div class="row align-items-center">
                  <div class="col-lg-6 mb-4 mb-lg-0">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="..."
                    />
                  </div>
                  <div class="col-lg-6 px-xl-10">
                    <div class="bg-primary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                      <h3 class="h2 text-white mb-0">Users Full Name</h3>
                    </div>
                    <ul class="list-unstyled mb-1-9">
                      <li class="mb-2 mb-xl-3 display-28">
                        <span class="display-26 text-secondary me-2 font-weight-600">
                          Email:
                        </span>{" "}
                        This will display the email
                      </li>
                      <li class="mb-2 mb-xl-3 display-28">
                        <span class="display-26 text-secondary me-2 font-weight-600">
                          First Name:
                        </span>{" "}
                        Some
                      </li>
                      <li class="mb-2 mb-xl-3 display-28">
                        <span class="display-26 text-secondary me-2 font-weight-600">
                          Last Name:
                        </span>{" "}
                        Guy
                      </li>
                      <li class="mb-2 mb-xl-3 display-28">
                        <span class="display-26 text-secondary me-2 font-weight-600">
                          Intolerances:
                        </span>{" "}
                        [This will be the intolerances]
                      </li>
                      <li class="display-28">
                        <button className="btn btn-primary">
                          Edit Profile
                        </button>
                      </li>
                    </ul>
                    <ul class="social-icon-style1 list-unstyled mb-0 ps-0">
                      <li>
                        <a href="#!">
                          <i class="ti-twitter-alt"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i class="ti-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i class="ti-pinterest"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i class="ti-instagram"></i>
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
