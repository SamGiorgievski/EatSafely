import React from "react";
import "./scan_loading.scss";

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