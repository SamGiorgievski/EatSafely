import React from "react";

export default function ScanLoading({progress, loading}) {
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