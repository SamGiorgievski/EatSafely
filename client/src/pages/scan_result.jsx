import { useEffect } from "react";

export default function ScanResult({ocrState, confidence, searchText, intolerances}) {

  useEffect(() => {
    console.log(`useEffect intolerances: ${intolerances}`);
    console.log(`useEffect text: ${ocrState.text}`);
  }, [ocrState, intolerances]);

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

    // console.log(`find matches: newStr ${newStr}`);

    let strArray = newStr.split(" ");

    // console.log(`find matches: strArray ${strArray}`);
    // console.log(`find matches: strArray ${typeof strArray}`);

    // console.log(`find matches: intolerances - ${intoleranceArray}`)
    // console.log(`find matches: intolerances - ${typeof intoleranceArray}`)
    
    for (let i = 0; i < intoleranceArray.length; i++) {
      console.log(intoleranceArray[i])
      for (let j = 0; j < strArray.length; j++) {
        // console.log(strArray[j])
        if (intoleranceArray[i] === strArray[j]) {
          matches.push(intoleranceArray[i]);
          break;
        }
      }
    }
    
    // console.log(matches);
    return matches;
  }


  return (
    <main className="results">
      <div className="text-box">
        <p className="results" id="inner">
          {ocrState.text && <span> Results: {ocrState.text}</span>}
          {confidence > 55 && <span>High confidence : {confidence}%</span>}
          <div className="Matches">
            {intolerances && <span> Matches: {findMatches(intolerances, ocrState.text)}</span>}
          </div>
        </p>
      </div>
      <p>
          
        </p>
    </main>
  );
}
