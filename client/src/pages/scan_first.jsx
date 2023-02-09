import React from "react";
import "./scan_first.scss";

export default function ScanFirst({intolerances, setOcrState, handleClick, setConfidence, handleChange, setImagePath}) {
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
            <p>Searching image for: {intolerances}</p>
          </div>
        </section>

      {/* Scan and clear buttons */}
      <section className="scan_clear">
        <button 
        type="button" 
        className="btn btn-primary"
        onClick={() => {
          handleClick();
          setConfidence(0);
        }}>
          Scan
        </button>
      </section>
      </div>

    </main>
  );
}