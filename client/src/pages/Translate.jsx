import React, { useState } from "react";
import axios from "axios";
import "./Translate.scss";

function Translate() {
  const [lang, setLang] = useState();
  const [translation, setTranslation] = useState("");
  const [cardContents, setCardContents] = useState("");

  const handleLangChange = (event) => {
    setLang(event.target.value);
  };

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
      console.log(data);
    } catch (error) {
      console.error(error);
      return "Error occurred while translating the text.";
    }
  }

  console.log(
    translateTo(
      "My name is Brad, I have Celiac Disease. I can not eat Wheat, Rye or Barley"
    )
  );

  return (
    <div>
      <section className="main--section">
        <div className="container--card">
          <h1>Travel Cards</h1>
          <p>
            Here you can create a custom travel card that you can show resturant
            staff that may speak a different language than you.
          </p>
          <form action="">
            <label htmlFor="">Language</label>
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
          <p>{translation}</p>
        </div>
        <div className="result">
          <img src="images/empty-card.png" alt="" />
          <div className="card--title">
            <h3>Restuarant Card</h3>
          </div>
          <div className="card--contents--div">
            <p className="card--contents">
              Hello, my name is Brad. Please be aware that I have some food
              intolerances that I hope you will be able to accomadate. Could you
              please reccomend something on the menu that does not contain, or
              is not cooked with or around the following:{" "}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Translate;
