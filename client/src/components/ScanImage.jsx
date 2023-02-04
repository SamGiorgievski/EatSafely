import React from "react";
import "./ScanImage.scss";

function ScanImage() {
  return (
    <main className="layout">
      <section className="nav">
        <img src="images/eatsafely_logo.png"></img>
      </section>
      <section className="ocr">
        <img src="/images/yogurt.jpg"></img>

        <div className="cam_buttons">
          <button type="button" className="btn btn-primary">
            Upload
          </button>
          <button type="button" className="btn btn-primary">
            Camera
          </button>
        </div>
        <div className="scanner">
          <alert className="alert alert-secondary" role="alert">
            Upload your image
          </alert>
        </div>
        <div className="user_ingredients">
          <p>Searching image for...</p>
        </div>
        <div className="navigation">
          <button type="button" className="btn btn-primary">
            Back
          </button>
          <button type="button" className="btn btn-primary" disabled>
            Next
          </button>
        </div>
      </section>
    </main>
  );
}

export default ScanImage;
