import { useState, useEffect } from "react";
import ScanFirst from "./scan_first";
import ScanResult from "./scan_result";
import ScanLoading from "./scan_loading";
import EditProfile from "../componetns/EditProfile";
import "./ScanImage.scss";
const Tesseract = require("tesseract.js");


function ScanImage({intolerances, setIntolerances, showModal, setShowModal, toggleModal, storedData}) {

  // Page state
  const [scanState, setscanState] = useState({
    page: "first",
    loading: false,
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
    if (!imagePath) {
      return;
    }

    isLoading(true);
    // Change page state to loading
    setscanState((prev) => ({
      ...prev,
      loading: true,
    }));

    // Start tesseract OCR
    Tesseract.recognize(imagePath, "eng", {
      logger: (m) => {
        setProgress(m.progress);
      },
    })
      .catch((err) => {
        console.error(err);
      })
      .then((result) => {
        console.log(result);
        isLoading(false);

        // Get Confidence score
        let confidenceResult = result.data.confidence;
        setConfidence(confidenceResult);
        let text = result.data.text;

        if (confidenceResult < 50) {
          console.log("HELPPPPP");
          return setOcrState((prev) => ({
            ...prev,
            img: (
              <img
                src="https://www.gran-turismo.com/gtsport/decal/5845681194092494864_1.png"
                alt="warning"
                className="checkmark"
              />
            ),
          }));
        } else {
          setOcrState((prev) => ({
            ...prev,
            text,
            array: confidentTextArray(result),
            img: (
              <img
                src="https://www.gran-turismo.com/gtsport/decal/5845681194092494864_1.png"
                alt="warning"
                className="checkmark"
              />
            ),
          }));
        }
      });

    // Change scanState to view results
    setscanState((prev) => ({
      ...prev,
      page: "result",
      loading: false,
    }));
  };

  // returns array of text where each word is above a % of confidence
  function confidentTextArray(result) {
    const returnArray = [];
    const wordArray = result.data.words;

    wordArray.forEach(word => {
      if (word.confidence >= 50) {
        returnArray.push(word.text);
      }
    });

    return returnArray;
  }

  // Back/retry button

  function backButton() {
    setscanState((prev) => ({
      ...prev,
      page: "first",
    }));

    setOcrState((prev) => ({
      ...prev,
      text: "",
      array: []
    }))

    setImagePath("");

  }

  return (
    <div className="scan_card">
      <section className="ocr">
        <h3 className="instructions">Please upload an image to scan</h3>

        {/* View uploaded image */}
        <div >
          {imagePath &&
          <img src={imagePath} alt="Upload"/>
          }
          {/* https://placeholder.com/ */}
          {!imagePath &&
          <img src={"https://via.placeholder.com/300/808080.png/fff?text=Upload+image+to+begin"} alt="scanned_image"/>}
        </div>

        {/* Loading state */}
        {!loading ? (
          <div className="text-box"></div>
        ) : (
          <label>
            <br />
            <br />
            Loading <br />
            <progress value={progress}></progress>
          </label>
        )}

        {/* Confidence state
        {confidence < 55 ? (
          <p>
            The confidence score of this scan is: {confidence}% <br />
            Please take a more clear picture to get more confident results...
          </p>
        ) : (
          <p></p>
        )} */}

        {/* Results rendering */}

        {scanState.page === "first" && <ScanFirst 
        intolerances={intolerances}
        setIntolerances={setIntolerances} 
        setOcrState={setOcrState} 
        handleClick={handleClick} 
        setConfidence={setConfidence} 
        handleChange={handleChange} 
        setImagePath={setImagePath}
        imagePath={imagePath}
        toggleModal={toggleModal}
        storedData={storedData}></ScanFirst>}

        {/* {scanState.loading === true && <Scan_loading progress={progress} loading={loading}></Scan_loading>} */}
        {scanState.page === "result" && <ScanResult 
        intolerances={intolerances} 
        ocrState={ocrState} 
        confidence={confidence} 
        backButton={backButton}
        progress={progress}
        loading={loading}></ScanResult>}

          {/* Edit Intolerances */}
          {showModal && (
            <EditProfile
              toggle={toggleModal}
              state={(showModal, setShowModal)}
              storedData={storedData}
              setIntolerances={setIntolerances}
            />
          )}

      </section>
    </div>
  );
}

export default ScanImage;
