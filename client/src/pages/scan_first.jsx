import React from "react";
import "./scan_first.scss";

export default function ScanFirst({intolerances, setOcrState, handleClick, setConfidence, handleChange, setImagePath, toggleModal}) {
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