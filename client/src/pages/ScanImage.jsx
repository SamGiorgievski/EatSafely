import { useState, useEffect } from "react";
import ScanFirst from "./scan_first";
import ScanResult from "./scan_result";
import ScanLoading from "./scan_loading";
import "./ScanImage.scss";
const Tesseract = require("tesseract.js");



function ScanImage({intolerances}) {

  // Page state
  const [scanState, setscanState] = useState({
    page: "first",
    loading: false
  });
  // Ocr data states
  const [ocrState, setOcrState] = useState({
    text: "",
    array: [],
  });
  // Loading states
  const [loading, isLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [confidence, setConfidence] = useState();
  const [imagePath, setImagePath] = useState("");
  
 
  // Upload file event handler
  const handleChange = (event) => {
    setImagePath(URL.createObjectURL(event.target.files[0]));
  };

  // UseEffect for testing
  useEffect(() => {
    console.log(scanState);
    // searchText(["Wheat", "cake"], intolerances);
    console.log(ocrState.text);
  }, [scanState, ocrState.text]);


  // Scan image onClick event handler
  const handleClick = () => {

    // Change page state to loading
    setscanState(prev => ({
      ...prev,
      loading: true}));

    // Start tesseract OCR
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
          return setOcrState( prev => ({
            ...prev,
            img: <img
              src="https://www.gran-turismo.com/gtsport/decal/5845681194092494864_1.png"
              alt="warning"
              className="checkmark"
            />
          })
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
          setOcrState( prev => ({
            ...prev,
            text,
            array: confidentTextArray(result),
            img: <img
              src="https://www.gran-turismo.com/gtsport/decal/5845681194092494864_1.png"
              alt="warning"
              className="checkmark"
            />
          })
          );
        } else {
          setOcrState( prev => ({
            ...prev,
            text: confidentTextArray(result).join(' '),
            array: confidentTextArray(result),
            img: <img
              src="https://www.gran-turismo.com/gtsport/decal/5845681194092494864_1.png"
              alt="warning"
              className="checkmark"
            />
          })
      )}
      });

      // Change scanState to view results
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

  
  return (
    <main className="layout">
      <section className="ocr">
        <h3>Please upload an image to scan</h3>
        
        {/* View uploaded image */}
        <div >
          {imagePath &&
          <img src={imagePath} alt="Upload"/>
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

        {scanState.page === "first" && <ScanFirst intolerances={intolerances} setOcrState={setOcrState} handleClick={handleClick} setConfidence={setConfidence} handleChange={handleChange}></ScanFirst>}
        {/* {scanState.loading === true && <Scan_loading progress={progress} loading={loading}></Scan_loading>} */}
        {scanState.page === "result" && <ScanResult intolerances={intolerances} ocrState={ocrState} confidence={confidence} ></ScanResult>}
          
        {/* Nav buttons */}
        <div className="navigation">
          <button type="button" className="btn btn-primary" onClick={() => setscanState(prev => ({
            ...prev,
            page: "first"
          })
          )}>
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
