import React, { useState, useEffect } from "react";
import EditProfile from "../componetns/EditProfile";
import axios from "axios";
import "./Profile.scss";
import { useGlobalContext } from "../context";
import AddProfile from "../componetns/AddProfile";


//Function that if the sting passed is greater than nth number of char, hides the remaining after 150 and adds ...
// function truncate(string, n) {
//   return string?.length > n ? string.substr(0, n - 1) + "..." : string;

const Profile = ({ getIntolerances }) => {
  const [showModal, setShowModal] = useState(false);
  const [intolerances, setIntolerances] = useState([]);
  const { isLoggedIn, setIsLoggedIn } = useGlobalContext();
  const [storedData, setStoredData] = useState(
    JSON.parse(sessionStorage.getItem("userData"))
  );

  console.log("stored data", storedData);

  const [newProfile, setNewProfile] = useState({
    first_name: "",
    last_name: ""
  });
  const [showNewProfileModal, setShowNewProfileModal] = useState(false);

  useEffect(() => {
    setStoredData(JSON.parse(sessionStorage.getItem("userData")));
  }, []);

  useEffect(() => {
    getIntolerances(intolerances);
  }, [intolerances]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleAddProfileModal = () => {
    setShowNewProfileModal(!showNewProfileModal);
  };


  // useEffect(() => {
  //   axios
  //     .get(`/intolerances/${storedData.data.user.id}`
  //       // sessionData: storedData.data.user.id,
  //     )
  //     .then((res) => {
  //       console.log("RES", res);
  //       setIntolerances(res.data.intolerance);
  //       // getIntolerances(res.data.rows[0].intolerance);
  //     })
  //     .catch((err) => console.error(err.response.data));

  // }, []);  


  return (
    <section>
      {storedData.map((user) => {
        return (
      <div className="card" key={user.id}>
        <img
          className="card-img-top"
          src="https://t3.ftcdn.net/jpg/02/94/69/02/360_F_294690239_ydek2JMXB9aeQcYY05jVewc0xocZrCNg.jpg"
          alt="veg"
        />
        <div className="card-body">
          <h3 className="h2 text-black mb-0 user--name">{`${user.first_name} ${user.last_name}`}</h3>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            First Name: {user.first_name}
          </li>
          <li className="list-group-item">
            Last Name: {user.last_name}
          </li>
          {user.email && (
          <li className="list-group-item">
            Email: {user.email}
          </li>
          )}
          <li className="list-group-item">Intolerances: {intolerances}</li>
          {/* <li className="list-group-item">New Profile: {newProfile.first_name}</li> */}
        </ul>
        <div className="card-body">
          <div>
            <button onClick={toggleModal} className="btn btn-primary">
              Edit
            </button>
            <button onClick={toggleAddProfileModal} className="btn btn-primary">
              Add Profile
            </button>

          </div>

          {showModal && (
            <EditProfile
              toggle={toggleModal}
              state={(showModal, setShowModal)}
              storedData={storedData}
              setIntolerances={setIntolerances}
            />

          )}
          {showNewProfileModal && (
            <AddProfile 
            toggle={toggleAddProfileModal}
            setNewProfile={setNewProfile}
            setStoredData={setStoredData}
            />
          )}

        </div>
      </div>
        )
      })}
    </section>
  );
};

export default Profile;
