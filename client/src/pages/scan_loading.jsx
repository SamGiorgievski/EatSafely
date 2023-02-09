import React from "react";

export default function Scan_loading({progress, loading}) {
  return (
    <main className="loading">

      <label>
        <br />
        <br />
        Loading <br />
        <progress value={progress}></progress>
      </label>

      <p> LOAAAADINGGGGGGGGGGG</p>
    </main>
  );
}