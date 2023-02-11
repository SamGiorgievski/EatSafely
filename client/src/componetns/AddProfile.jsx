import React, { useState, useEffect, useNavigate } from "react";
import axios from "axios";
import "./AddProfile.scss";

function AddProfile({ toggle }) {

  const [showModal, setShowModal] = useState(true);

  function toggle() {
    setShowModal(!showModal);
  };


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
            />
          
            <label htmlFor="lastName">Last Name</label>
          <input
              id="lastName"
              placeholder="Please enter name here"
              className="form-control"
            />
        </ul>
        <div className="card-body">
          <div>
          <button
            type="submit"
            className="btn btn-primary"
            // onClick={() => {
            //   toggle();
            //   updateUser();
            // }}
          >
            Save Changes
          </button>
          <button onClick={toggle} className="btn btn-primary">
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
