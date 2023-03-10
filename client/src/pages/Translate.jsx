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
  useEffect(() => {
    setStoredData(JSON.parse(localStorage.getItem("userData")));
  }, []);
  const handleLangChange = (event) => {
    setLang(event.target.value);
    setModalIsOpen(true);
    translateTo(sentence);
  };

  const [storedData, setStoredData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );

  const sentence = `Hello, my name is ${storedData.data.user.first_name}. Please be aware that I have some food
intolerances that I hope you will be able to accommodate. Could you
please recommend something on the menu that does not contain, or
is not cooked with or around the following: ${intolerances}`;

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
      <div className="img--div">
        <img
          src="https://whatsupusana.com/wp-content/uploads/2016/08/TravelFood.jpg"
          alt=""
          className="picture"
        />
        <img
          src="https://khni.kerry.com/wp-content/uploads/2018/12/Travel-eating-1024x683.jpg"
          alt=""
          className="picture"
        />
        <img
          src="https://www.smartertravel.com/wp-content/uploads/2017/06/asian-food-from-above-shutterstock_446808100.jpg"
          alt=""
          className="picture"
        />
      </div>
      <section className="main--section">
        <div className="container--card">
          <h1>Travel Cards</h1>
          <p>
            Here you can create a custom travel card that you can show
            restaurant staff that may speak a different language than you.
          </p>
          <form action="">
            <label htmlFor="">Select language to translate to:</label>
            <select name="lang" id="lang" onChange={handleLangChange}>
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
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
          <h2 className="card--title">Restaurant Card</h2>
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
