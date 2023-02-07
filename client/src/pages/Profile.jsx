import React, { useState, useEffect } from "react";
import EditProfile from "../componetns/EditProfile";
import Modal from "react-modal";
import axios from "axios";
import "./Profile.scss";
import { useGlobalContext } from "../context";

const Profile = (props) => {
  const [userData, setUserData] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useGlobalContext();
  let storedData;

  if (isLoggedIn) {
    storedData = JSON.parse(sessionStorage.getItem("userData"));
  }

  console.log(storedData.data.user);

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
      <div className="card">
        <img
          className="card-img-top"
          src="https://t3.ftcdn.net/jpg/02/94/69/02/360_F_294690239_ydek2JMXB9aeQcYY05jVewc0xocZrCNg.jpg"
          alt="veg"
        />
        <div className="card-body">
          <h3 className="h2 text-black mb-0 user--name">{`${userData.first_name} ${userData.last_name}`}</h3>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">First Name: {userData.first_name}</li>
          <li className="list-group-item">Last Name: {userData.last_name}</li>
          <li className="list-group-item">Email: {userData.email}</li>
          <li className="list-group-item">
            Intolerances: {userData.intolerance}
          </li>
        </ul>
        <div className="card-body">
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
