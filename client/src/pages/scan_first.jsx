import React from "react";

export default function Scan_first({intolerances, setText, handleClick, setConfidence, handleChange}) {
  return (
    <main className="first">
      
      <div className="cam_buttons">

      {/* Choose file button */}
      <input
        type="file"
        onChange={handleChange}
      />

      {/* Scan and clear buttons */}
      <section className="scan_clear">
        <button 
        type="button" 
        className="btn btn-primary"
        onClick={() => {
          setText("");
        }}>
          Clear
        </button>
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

      <section className="user_ingredients">
          <div>
            <p>Searching image for...</p>
          </div>
          <div>
            <p>{intolerances}</p>
          </div>
        </section>
    </main>
  );
}