import React, { useState, useEffect, useNavigate } from "react";
import axios from "axios";
import "./AddProfile.scss";

function AddProfile({ toggle, setNewProfile, setStoredData }) {

  const [showModal, setShowModal] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // const [childIntolerances, setChildIntolerances] = useState([]);

  function toggleCard() {
    setShowModal(!showModal);
  };

  function addNewProfileCard() {
    axios.post("/adduser", {
      first_name: firstName,
      last_name: lastName,
    })
    .then((res) => {
      console.log("----", res);
      setNewProfile({
        first_name: res.data.first_name,
        last_name: res.data.last_name,
      })
      toggle();

    })
    .catch((err) => console.error());

    const sessionArray = JSON.parse(sessionStorage.getItem("userData"));
    sessionStorage.setItem("userData", JSON.stringify([...sessionArray, {
      first_name: firstName,
      last_name: lastName
    }]));

    setStoredData([...sessionArray, {
      first_name: firstName,
      last_name: lastName
    }]);
  }

  return (
    <section>
      {showModal && ( 
      <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add Profile Card</h3>
        </div>
        <ul className="list-group list-group-flush">
        
            <label htmlFor="firstName">First Name</label>
          <input
              id="firstName"
              placeholder="Please enter name here"
              className="form-control"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          
            <label htmlFor="lastName">Last Name</label>
          <input
              id="lastName"
              placeholder="Please enter name here"
              className="form-control"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
        </ul>
        <div className="card-body">
          <div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => {
              toggle();
              addNewProfileCard();
            }}
          >
            Save Changes
          </button>
          <button onClick={toggleCard} className="btn btn-primary">
            Close
          </button>

          </div>
        </div>
      </div>
    </div>
   )}
    </section>

  );
};

export default AddProfile;
