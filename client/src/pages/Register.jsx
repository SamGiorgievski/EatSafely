import React from "react";
import "./Register.scss";

function Register() {
  return (
    <section class="text-center text-lg-start">
      <img
        src="images/eatsafely_logo.png"
        alt="page-img"
        className="logo"
      ></img>

      <div class="container py-4">
        <div class="row g-0 align-items-center">
          <div class="col-lg-6 mb-5 mb-lg-0">
            <div class="card cascading-right">
              <div class="card-body p-5 shadow-5 text-center">
                <h2 class="fw-bold mb-5">Sign up now</h2>
                <form method="POST" action="/register">
                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <input
                          type="text"
                          name="first_name"
                          for="first_name"
                          id="form3Example1"
                          class="form-control"
                        />
                        <label class="form-label" for="first_name">
                          First name
                        </label>
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <input
                          type="text"
                          name="last_name"
                          for="last_name"
                          id="form3Example2"
                          class="form-control"
                        />
                        <label class="form-label" for="last_name">
                          Last name
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="form-outline mb-4">
                    <input
                      type="email"
                      name="email"
                      for="email"
                      id="form3Example3"
                      class="form-control"
                    />
                    <label class="form-label" for="email">
                      Email address
                    </label>
                  </div>

                  <div class="form-outline mb-4">
                    <input
                      type="password"
                      name="password"
                      for="password"
                      id="form3Example4"
                      class="form-control"
                    />
                    <label class="form-label" for="password">
                      Password
                    </label>
                  </div>

                  <button type="submit" class="btn btn-primary btn-block mb-4">
                    Sign up
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div class="col-lg-6 mb-5 mb-lg-0">
            <img
              src="https://my-doc.com/wp-content/uploads/2020/08/harvardhealth.jpg"
              class="w-100 rounded-4 shadow-4"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
