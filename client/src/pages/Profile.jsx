import React, { useState, useEffect } from "react";
import EditProfile from "../componetns/EditProfile";
import Modal from "react-modal";
import axios from "axios";
import "./Profile.scss";

const Profile = (props) => {
  const [userData, setUserData] = useState("");
  const [showModal, setShowModal] = useState(false);

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

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <section className="bg-light">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mb-4 mb-sm-5">
            <div className="card card-style1 border-0">
              <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                <div className="row align-items-center">
                  <div className="col-lg-6 px-xl-10 main--container">
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
                        {userData.intolerance}
                      </li>
                      <li className="display-28">
                        <div>
                          <button
                            onClick={toggleModal}
                            className="btn btn-primary"
                          >
                            Edit
                          </button>
                        </div>
                      </li>
                    </ul>
                    {showModal && (
                      <EditProfile
                        toggle={toggleModal}
                        state={(showModal, setShowModal)}
                      />
                    )}

                    <img
                      className="img"
                      src="https://files.worldwildlife.org/wwfcmsprod/images/Takeaway_graphic_Summer_2019/story_full_width/4mhxvgukpd_Takeaway_graphic_Summer_2019.png"
                      alt="..."
                    />
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
