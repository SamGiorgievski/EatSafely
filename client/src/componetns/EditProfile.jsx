import React, { useState, useEffect, useNavigate } from "react";
import axios from "axios";
import "./EditProfile.scss";

const EditProfile = ({
  toggle,
  setIntolerances,
  storedData,
  setStoredData,
}) => {
  // let [storedData, setStoredData] = useState({});

  const [celiacChecked, setCeliacChecked] = useState(false);
  const [nutsChecked, setNutsChecked] = useState(false);
  const [dairyChecked, setDairyChecked] = useState(false);
  const [veganChecked, setVeganChecked] = useState(false);
  const [special, setSpecial] = useState([]);

  const handleCeliacCheck = (event) => {
    setCeliacChecked(event.target.checked);
  };
  const handleNutCheck = (event) => {
    setNutsChecked(event.target.checked);
  };
  const handleDairyCheck = (event) => {
    setDairyChecked(event.target.checked);
  };
  const handleVeganCheck = (event) => {
    setVeganChecked(event.target.checked);
  };
  const handleSpecial = (event) => {
    setSpecial(event.target.value);
  };
  const updateUser = (event) => {
    const intolerancesArr = [];
    if (celiacChecked) {
      intolerancesArr.push("Wheat, Rye, Barley, Malt, Triticale, Semolina");
    }
    if (nutsChecked) {
      intolerancesArr.push(
        "Peanut, Cashew, Almond, Pistachio, Macadamia Nut, Walnut, Pecan, Hazelnut, Chestnut, Pine Nut, Praline"
      );
    }
    if (dairyChecked) {
      intolerancesArr.push("Milk Sugar, Lactose, Casein, Cheese");
    }
    if (veganChecked) {
      intolerancesArr.push(
        "Casein, Lactose, Whey, Collagen, Elastin, Keratin, Gelatine/gelatin, Aspic, Lard/tallow, Shellac, Honey, Propolis, D3, Albumen/albumin, Isinglass, Cod liver oil, Pepsin, Rennet, Chicken, Beef, Pork"
      );
    }
    if (special.length > 0) {
      intolerancesArr.push(special);
    }

    axios
      .put("/update", {
        sessionData: storedData.data.user.id,
        intolerances: intolerancesArr.join(", "),
      })
      .then((res) => {
        sessionStorage.setItem("userData", JSON.stringify(res.data));
        setStoredData(res.data);
        setIntolerances(res.data.rows[0].intolerance);
        toggle();
      })
      .catch((err) => console.error(err.response.data));

    setIntolerances(intolerancesArr.join(", "));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Edit Intolerances</h3>
        </div>
        <form method="POST" action="/register">
          <div className="row">
            <div className="col-md-6 mb-4"></div>
          </div>
          {/* Intolerances */}
          <div className="form-outline mb-4">
            <input
              id="intolerance--edit"
              placeholder="Please put any special ingredients here.."
              className="form-control"
              onChange={handleSpecial}
            />
            <label className="form-label" for="password">
              Intolerances
            </label>
          </div>

          {/* List of premade intolerances */}
          <label className="form-label">
            Please select any of the pre-defined list of intolerances or
            allergies:
          </label>
          <div className="form-outline mb-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={handleCeliacCheck}
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" for="flexCheckDefault">
                Celiac Disease - (Wheat, Rye, Barley)
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                onChange={handleNutCheck}
                id="flexCheckDefault"
              />
              <label className="form-check-label" for="flexCheckDefault">
                Nut Allergy - (Peanuts, Cashews, Almonds, Pistachios)
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={handleVeganCheck}
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" for="flexCheckDefault">
                Vegan - (Any Animal derived product)
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                onChange={handleDairyCheck}
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
                Dairy-Free (Lactose, Milk, Cheese, Yogurt)
              </label>
            </div>
          </div>
        </form>
        <div className="modal-footer">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => {
              toggle();
              updateUser();
            }}
          >
            Save Changes
          </button>
          <button onClick={toggle} className="btn btn-primary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
