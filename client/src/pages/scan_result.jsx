import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./scan_result.scss";

export default function ScanResult({
  ocrState,
  confidence,
  intolerances,
  backButton,
  progress,
  loading,
}) {
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();


  function highlightText(intolerances, str) {
    console.log(intolerances);
    if (!intolerances) {
      console.log("Hello :)");
      return navigate("/login");
    }

    // take out punctuation
    let newStr = "";
    const validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
    // /[A-Z]\i/

    for (let i = 0; i < str.length; i++) {
      let char = str[i];
      if (validChars.indexOf(char) !== -1) {
        newStr += char;
      }
    }

    // format inputs
    const matches = [];
    let intoleranceLowerCase = intolerances.toLowerCase();
    let intoleranceArray = intoleranceLowerCase.split(", ");
    let newStrLowerCase = newStr.toLowerCase();
    let strArray = newStrLowerCase.split(" ");
    let lowercaseOcrState = ocrState.array.map((index) => {
      return index.toLowerCase();
    });
    // console.log(`ocrState.array: ${ocrState.array}`)
    // console.log(`str: ${str}`)
    // console.log(`newStr: ${newStr}`)
    // console.log(`newStrLowerCase: ${newStrLowerCase}`)
    // console.log(`strArray: ${strArray}`)
    // // str.includes(combination)
    // console.log(`lowercaseOcrState: ${lowercaseOcrState}`)

    // find matches
    for (let i = 0; i < intoleranceArray.length; i++) {
      for (let j = 0; j < strArray.length; j++) {
        if (intoleranceArray[i] === strArray[j]) {
          matches.push(intoleranceArray[i]);
          break;
        }
      }
    }

    // function to see if a word contains any word in an array
    function includesAny(str, arr) {
      return arr.some(function(word) {
        return str.includes(word);
      });
    }

    // highlight text
    const highlighterReturn = [];
    let key = 0;
      for (let j = 0; j < strArray.length; j++) {
        key += 1;
        if (includesAny(lowercaseOcrState[j], matches)) {

          let formattedMatchString = "";

          for (let i = 0; i < matches.length; i++) {
            if (lowercaseOcrState[j].includes(matches[i])) {
              formattedMatchString = matches[i];
            }
          }
            
            highlighterReturn.push(
              <span className="highlight" key={key}>
                {`${formattedMatchString.toUpperCase()}`}
              </span>
            );

            // Check if bracket is at end of the word, then push ", " or "), " so they're not highlighted
            key += 1;
            if (lowercaseOcrState[j].charAt(lowercaseOcrState[j].length - 2) === ")") {
              highlighterReturn.push(<span key={key}>), </span>);
            } else {
              highlighterReturn.push(<span key={key}>, </span>);
            }
          
        } else {
          highlighterReturn.push(`${ocrState.array[j]} `);
        }
      }

    if (matches[0] && !loading) {
      return (
        <div className="result_matches">
          <div className="result_matches_warning">
            Results: Warning, this product contains harmful ingredients!
          </div>
          <div className="result_matches_text">{highlighterReturn}</div>
        </div>
      );
    } else if (!matches[0] && !loading) {
      return (
        <div className="result_nomatches">
          <div className="result_nomatches_warning">
            Results: This product is safe for consumption!
          </div>
          <div className="result_nomatches_text">
            {ocrState.array.join(" ")}
          </div>
        </div>
      );
    }
  }

  return (
    <main className="results">
      <div className="text-box">
        <span className="results_main" id="inner">
          {/* {ocrState.text && <span> Results: {ocrState.text}</span>} */}
          {/* {confidence > 55 && <span>High confidence : {confidence}%</span>} */}
          <div className="text_with_highlight">
            {highlightText(intolerances, ocrState.text)}
          </div>
        </span>
      </div>

      {/* Scan new */}

      {matches && (
        <div className="navigation">
          <button
            type="button"
            className="btn btn-primary"
            onClick={backButton}
          >
            Scan again
          </button>
        </div>
      )}
    </main>
  );
}
