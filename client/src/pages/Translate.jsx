import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./Translate.scss";
import { useEffect } from "react";

function Translate({ intolerances }) {
  const [lang, setLang] = useState("en");
  const [translation, setTranslation] = useState("");
  const [cardContents, setCardContents] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleLangChange = (event) => {
    setLang(event.target.value);
    setModalIsOpen(true);
    translateTo(sentence);
  };

  const [storedData, setStoredData] = useState(
    JSON.parse(sessionStorage.getItem("userData"))
  );

  const sentence = `Hello, my name is ${storedData.data.user.first_name}. Please be aware that I have some food
intolerances that I hope you will be able to accomodate. Could you
please reccomend something on the menu that does not contain, or
is not cooked with or around the following: ${intolerances}`;

  useEffect(() => {
    setStoredData(JSON.parse(sessionStorage.getItem("userData")));
  }, []);

  async function translateTo(sentence) {
    try {
      const response = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        body: JSON.stringify({
          q: sentence,
          source: "en",
          target: lang,
          format: "text",
          api_key: "c2fc10e1-7f24-45b2-9cf7-ff69bc57d779",
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setTranslation(data.translatedText);
    } catch (error) {
      console.error(error);
      return "Error occurred while translating the text.";
    }
  }

  translateTo(sentence);

  return (
    <div className="full--content">
      <div className="images--div">
        <img
          src="https://www.internationalinsurance.com/wp-content/uploads/2022/12/iStock-1431699900.jpg"
          alt=""
          className="pic1"
        />
      </div>
      <section className="main--section">
        <div className="container--card">
          <h1>Travel Cards</h1>
          <p>
            Here you can create a custom travel card that you can show resturant
            staff that may speak a different language than you.
          </p>
          <form action="">
            <label htmlFor="">Select language to translate to:</label>
            <select name="lang" id="lang" onChange={handleLangChange}>
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
              <option value="zh">Chinese</option>
              <option value="de">German</option>
              <option value="it">Italian</option>
              <option value="ja">Japanese</option>
              <option value="ko">Korean</option>
              <option value="pt">Portuguese</option>
              <option value="tr">Turkish</option>
            </select>
          </form>
        </div>
      </section>
      {translation ? (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="modal--card"
        >
          <h2 className="card--title">Restaraunt Card</h2>
          <p>{translation}</p>
          <button
            onClick={() => {
              setModalIsOpen(false);
              setTranslation("");
            }}
            className="close--button"
          >
            Close
          </button>
        </Modal>
      ) : (
        <p></p>
      )}
      ;
    </div>
  );
}

export default Translate;
