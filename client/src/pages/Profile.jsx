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
    <section>
      <div class="card">
        <img
          class="card-img-top"
          src="https://t3.ftcdn.net/jpg/02/94/69/02/360_F_294690239_ydek2JMXB9aeQcYY05jVewc0xocZrCNg.jpg"
          alt="veg"
        />
        <div class="card-body">
          <h3 className="h2 text-black mb-0 user--name">{`${userData.first_name} ${userData.last_name}`}</h3>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">First Name: {userData.first_name}</li>
          <li class="list-group-item">Last Name: {userData.last_name}</li>
          <li class="list-group-item">Email: {userData.email}</li>
          <li class="list-group-item">Intolerances: {userData.intolerance}</li>
        </ul>
        <div class="card-body">
          <div>
            <button onClick={toggleModal} className="btn btn-primary">
              Edit
            </button>
          </div>

          {showModal && (
            <EditProfile
              toggle={toggleModal}
              state={(showModal, setShowModal)}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
