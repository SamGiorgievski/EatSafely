import { useState, useEffect } from "react";
import Scan_first from "./scan_first";
import Scan_result from "./scan_result";
import Scan_loading from "./scan_loading";
import "./ScanImage.scss";
const Tesseract = require("tesseract.js");



function ScanImage({intolerances}) {

  // States
  const [imagePath, setImagePath] = useState("");
  const [text, setText] = useState({});
  const [loading, isLoading] = useState(false);
  const [confidence, setConfidence] = useState();
  const [progress, setProgress] = useState(0);
  const [scanState, setscanState] = useState({
    page: "first",
    loading: false
  });
  
  // Event handler
  const handleChange = (event) => {
    setImagePath(URL.createObjectURL(event.target.files[0]));
  };

  useEffect(() => {
    console.log(scanState);
    // searchText(["Wheat", "cake"], intolerances);
  }, [scanState]);

  // onClick event handler
  const handleClick = () => {

    setscanState(prev => ({
      ...prev,
      loading: true}));

    Tesseract.recognize(imagePath, "eng", {
      logger: (m) => {
        m.progress < 1 ? isLoading(true) : isLoading(false);
        setProgress(m.progress);
      },
    })
      .catch((err) => {
        console.error(err);
      })
      .then((result) => {

        // Get Confidence score
        let confidenceResult = result.data.confidence;
        setConfidence(confidenceResult);
        let text = result.data.text;

        if (confidenceResult < 55) {
          return setText(
            <img
              src="https://www.gran-turismo.com/gtsport/decal/5845681194092494864_1.png"
              alt="warning"
              className="checkmark"
            />
          );
        }

        // Check text for ingredients
        if (
          text.includes("WHEAT") ||
          text.includes("wheat") ||
          text.includes("Wheat") ||
          text.includes("RYE") ||
          text.includes("Rye") ||
          text.includes("rye") ||
          text.includes("BARLEY") ||
          text.includes("Barley") ||
          text.includes("barley")
        ) {
          setText({
            img: (
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Cross_red_circle.svg/768px-Cross_red_circle.svg.png"
                alt="checkmark"
                className="checkmark"
              ></img>
            ),
           text,
          });
        } else {
          setText({
            img: (
              <img
                src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3506993/green-checkmark-circle-icon-md.png"
                alt="checkmark"
                className="checkmark"
              ></img>
            ),
            text: confidentTextArray(result).join(' '),
          });
        }
      });

      // View result
      setscanState( prev => ({
        ...prev,
        page:"result",
        loading: false
      }));

  };


  function confidentTextArray (result) {
    const returnArray = [];
    const wordArray = result.data.words;

    wordArray.forEach(word => {
      if (word.confidence >= 65) {
        returnArray.push(word.text);
      } 
    })

    return returnArray;
  }


  function searchText (intolerances, text) {
    const splitString = text.split(' ');
    return intolerances.filter(item => splitString.every(word => item.includes(word)));
  }

  // Testing this in useeffect:
  // searchText(["Wheat", "cake"], intolerances);

  
  return (
    <main className="layout">
      <section className="ocr">
        <h3>Please upload an image to scan</h3>
        
        {/* View uploaded image */}
        <div >
          {imagePath &&
          <img src={imagePath}/>
          }
        </div>

        {/* Loading state */}
        {!loading ? (
          <div className="text-box">
          </div>
        ) : (
          <label>
            <br />
            <br />
            Loading <br />
            <progress value={progress}></progress>
          </label>
        )}

        {/* Confidence state */}
        {confidence < 55 ? (
          <p>
            The confidence score of this scan is: {confidence}% <br />
            Please take a more clear picture to get more confident results...
          </p>
        ) : (
          <p></p>
        )}

        {/* Results rendering */}

          {scanState.page === "first" && <Scan_first intolerances={intolerances} setText={setText} handleClick={handleClick} setConfidence={setConfidence} handleChange={handleChange} text={text.text}></Scan_first>}
          {/* {scanState.loading === true && <Scan_loading progress={progress} loading={loading}></Scan_loading>} */}
          {scanState.page === "result" && <Scan_result intolerances={intolerances} text={text.text} confidence={confidence} searchText={searchText}></Scan_result>}
          
          {/* User preferences */}
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
