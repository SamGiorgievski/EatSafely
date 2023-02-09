import { useState, useEffect } from "react";
import "./scan_result.scss";

export default function ScanResult({ocrState, confidence, intolerances}) {

  // useEffect(() => {
  //   findMatches
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

    for (let i = 0; i < matches.length; i++) {
      for (let j = 0; j < strArray.length; j++) {
        if (matches[i] === strArray[j]) {
          highlighterReturn.push(<span className="highlight"> {strArray[j]} </span>);
        } else {
          highlighterReturn.push(<span> {strArray[j]} </span>)
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
        <p className="results" id="inner">
          {/* {ocrState.text && <span> Results: {ocrState.text}</span>} */}
          {confidence > 55 && <span>High confidence : {confidence}%</span>}
          <div className="text_with_highlight">
            {highlightText(intolerances, ocrState.text)}
          </div>
          <div className="matches">
            {intolerances && <span> Matches: {findMatches(intolerances, ocrState.text)}</span>}
          </div>
        </p>
      </div>
      <p>
          
        </p>
    </main>
  );
}
