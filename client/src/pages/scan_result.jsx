import { useEffect } from "react";

export default function ScanResult({ocrState, confidence, searchText, intolerances}) {

  useEffect(() => {
    console.log(ocrState.text);
    console.log(typeof(ocrState.text));
  }, [ocrState.text]);

  return (
    <main className="results">
      <div className="text-box">
        <p className="results" id="inner">
          {ocrState.text && <p> Results: {ocrState.text}</p>}
          {confidence > 55 && <span>High confidence : {confidence}%</span>}
        </p>
      </div>
      <p>
          
        </p>
    </main>
  );
}
