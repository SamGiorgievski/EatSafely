import React from "react";
import "./scan_first.scss";
import axios from "axios";

export default function ScanFirst({intolerances, setIntolerances, setOcrState, handleClick, setConfidence, handleChange, setImagePath, toggleModal, storedData}) {

  axios
  .post("/intolerances", {
    sessionData: storedData.data.user.id,
  })
  .then((res) => {
    setIntolerances(res.data.rows[0].intolerance);
    // getIntolerances(res.data.rows[0].intolerance);
  })
  .catch((err) => console.error(err.response.data));

  return (
    <main className="first">
      
      <div className="cam_buttons">

      {/* Choose file button */}
      <input
        type="file"
        onChange={handleChange}
      />

        <section className="user_ingredients">
          <div>
            <p>Searching: {intolerances}</p>
          </div>
        </section>

      {/* Scan and edit buttons */}
      <section className="scan_edit">

        <button 
        type="button"
        onClick={toggleModal} 
        className="btn btn-primary edit">
            Edit Intolerances
        </button>

        <button 
        type="button" 
        className="btn btn-primary scan"
        onClick={() => {
          handleClick();
          setConfidence(0);
        }}>
          Scan image
        </button>
        
      </section>
      </div>

    </main>
  );
}