import { useState } from "react";
import "./ScanImage.scss";
const Tesseract = require("tesseract.js");



function ScanImage({intolerances}) {

  // States
  const [imagePath, setImagePath] = useState("");
  const [text, setText] = useState({});
  const [loading, isLoading] = useState(false);
  const [confidence, setConfidence] = useState();
  const [progress, setProgress] = useState(0);
  
  // Event handler
  const handleChange = (event) => {
    setImagePath(URL.createObjectURL(event.target.files[0]));
  };

  // onClick event handler
  const handleClick = () => {
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

        console.log(result);

        console.log(confidentText (result));

        // Get Confidence score
        let confidenceResult = result.data.confidence;
        setConfidence(confidenceResult);
        let text = result.data.text;
        console.log(result.data.text);
        if (confidenceResult < 55) {
          return setText(
            <img
              src="https://www.gran-turismo.com/gtsport/decal/5845681194092494864_1.png"
              alt="warning"
              className="checkmark"
            />
          );
        }

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
            text: <p>{text}</p>,
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
            text: <p>{text}</p>,
          });
        }
      });
  };

  function confidentText (result) {
    const returnArray = [];

    const wordArray = result.data.words;

    wordArray.forEach(word => {
      if (word.confidence >= 65) {
        returnArray.push(word.text);
      } 
    })

    const returnString = returnArray.join(' ');

    console.log(returnString);
    console.log(returnArray)

  };

  
  return (
    <main className="layout">
      <section className="ocr">
        <h3>Please upload an image to scan</h3>
        
        <div >
          {imagePath &&
          <img src={imagePath}/>
          }
        </div>

        {!loading ? (
          <div className="text-box">
            <p className="results" id="inner">
              {" "}
              {text.img}
              {text.text}
              {confidence > 55 ? (
                <p>High confidence : {confidence}%</p>
              ) : (
                <p></p>
              )}
            </p>
          </div>
        ) : (
          <label>
            <br />
            <br />
            Loading <br />
            <progress value={progress}></progress>
          </label>
        )}
        {/* <img src="/images/yogurt.jpg"></img> */}

        {confidence < 55 ? (
          <p>
            The confidence score of this scan is: {confidence}% <br />
            Please take a more clear picture to get more confident results...
          </p>
        ) : (
          <p></p>
        )}

        <div className="cam_buttons">

          {/* Choose file button */}
          <input
            type="file"
            onChange={handleChange}
          />

          <section className="scan_clear">
            <button 
            type="button" 
            className="btn btn-primary"
            onClick={() => {
              setText("");
              window.location.reload(true);
            }}>
              Clear
            </button>
            <button 
            type="button" 
            className="btn btn-primary"
            onClick={() => {
              handleClick();
              setConfidence(0);
            }}>
              Scan
            </button>
          </section>
        </div>

            {/* Status alerts */}
        <div className="scanner">
          {/* <alert className="alert alert-secondary" role="alert">
            Upload your image
          </alert> */}
        </div>

          {/* User preferences */}
        <section className="user_ingredients">
          <div>
            <p>Searching image for...</p>
          </div>
          <div>
            <p>{intolerances}</p>
          </div>
        </section>


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
