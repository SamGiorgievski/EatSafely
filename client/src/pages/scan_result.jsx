import React from "react";

export default function Scan_result({text, confidence, searchText, intolerances}) {

  console.log(text);
console.log(typeof(text));

  return (
    <main className="results">
      <div className="text-box">
        <p className="results" id="inner">
          {" "}
          {/* {text.img} */}
          {text}
          {confidence > 55 ? (
            <span>High confidence : {confidence}%</span>
            ) : (
            <span></span>
            )}
        </p>
      </div>
      <p>
          MATCHES: {searchText(intolerances, text)}
        </p>
    </main>
  );
}
