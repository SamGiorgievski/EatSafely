import React, { useState } from "react";

const EditProfile = (props) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Edit Profile</h3>
        </div>
        <div className="modal-footer">
          <button onClick={props.toggle} className="btn btn-primary">
            Close
          </button>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
