import { useState, useEffect } from "react";
import "./scan_result.scss";

export default function ScanResult({ocrState, confidence, intolerances, backButton}) {

  const [matches, setMatches] = useState([]);

  // useEffect(() => {
  //   findMatches(intolerances, ocrState.text)
  // }, [findMatches]);

  function findMatches(intolerances, str) {
    let matches = [];
    let newStr = "";
    let validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";
    let intoleranceArray = intolerances.split(", ");
    
    for (let i = 0; i < str.length; i++) {
      let char = str[i];
      if (validChars.indexOf(char) !== -1) {
        newStr += char;
      }
    }

    let strArray = newStr.split(" ");
    // console.log(`find matches: newStr ${newStr}`);
    // console.log(`find matches: strArray ${strArray}`);
    // console.log(`find matches: strArray ${typeof strArray}`);
    // console.log(`find matches: intolerances - ${intoleranceArray}`)
    // console.log(`find matches: intolerances - ${typeof intoleranceArray}`)
    
    for (let i = 0; i < intoleranceArray.length; i++) {
      for (let j = 0; j < strArray.length; j++) {
        if (intoleranceArray[i] === strArray[j]) {
          matches.push(intoleranceArray[i]);
          break;
        }
      }
    }

    setMatches(matches);
    return matches;
  }

  function highlightText (intolerances, str) {
    let matches = [];
    let newStr = "";
    let validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";
    let intoleranceArray = intolerances.split(", ");
    
    for (let i = 0; i < str.length; i++) {
      let char = str[i];
      if (validChars.indexOf(char) !== -1) {
        newStr += char;
      }
    }

    let strArray = newStr.split(" ");
    
    for (let i = 0; i < intoleranceArray.length; i++) {
      for (let j = 0; j < strArray.length; j++) {
        if (intoleranceArray[i] === strArray[j]) {
          matches.push(intoleranceArray[i]);
          break;
        }
      }
    }

    let highlighterReturn = [];
    let key = 0;
    for (let i = 0; i < matches.length; i++) {
      for (let j = 0; j < strArray.length; j++) {
        key += 1;
        if (matches[i] === strArray[j]) {
          highlighterReturn.push(<span className="highlight" key={key}> {strArray[j]} </span>);
        } else {
          highlighterReturn.push(<span key={key}> {strArray[j]} </span>)
        }
      }
    }

    return (
      <div>
        {highlighterReturn}
      </div>);

  }


  return (
    <main className="results">
      <div className="text-box">
        <span className="results" id="inner">
          {/* {ocrState.text && <span> Results: {ocrState.text}</span>} */}
          {confidence > 55 && <span>High confidence : {confidence}%</span>}
          <div className="text_with_highlight">
            {highlightText(intolerances, ocrState.text)}
          </div>
          <div className="matches">
            {/* {intolerances && <span> Matches: {findMatches(intolerances, ocrState.text)}</span>} */}
          </div>
        </span>
      </div>

      {/* Scan new */}

      {matches && 
      <div className="navigation">
      <button type="button" className="btn btn-primary" onClick={() => backButton()}>
        retry
      </button>
    </div>}

    </main>
  );
}
