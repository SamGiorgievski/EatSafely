import React, { useState, useEffect, useNavigate } from "react";
import axios from "axios";
import "./EditProfile.scss";

const EditProfile = ({ storedData, setStoredData, toggle }) => {
  // let [storedData, setStoredData] = useState({});

  const [celiacChecked, setCeliacChecked] = useState(false);
  const [peanutsChecked, setPeanutsChecked] = useState(false);
  const [special, setSpecial] = useState([]);

  const handleCeliacCheck = (event) => {
    setCeliacChecked(event.target.checked);
  };

  const handlePeanutCheck = (event) => {
    setPeanutsChecked(event.target.checked);
  };
  const handleSpecial = (event) => {
    setSpecial(event.target.value);
  };
  const updateUser = (event) => {
    const intolerancesArr = [];
    if (celiacChecked) {
      intolerancesArr.push("Wheat, Rye, Barley");
    }
    if (peanutsChecked) {
      intolerancesArr.push("Peanuts");
    }
    if (special.length > 0) {
      intolerancesArr.push(special);
    }

    axios
      .post("/update", {
        sessionData: storedData.data.user.id,
        intolerances: intolerancesArr.join(", "),
      })
      .then((res) => {
        sessionStorage.setItem("userData", JSON.stringify(res.data));
        setStoredData(res.data);
        toggle();
      })
      .catch((err) => console.error(err));
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
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                onChange={handleCeliacCheck}
                value=""
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
                Celiac Disease - (Wheat, Rye, Barley)
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                onChange={handlePeanutCheck}
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
                Peanut Allergy
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
                Vegetarian -(Beef, Pork, Chicken, Seafood)
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
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
              // handleCeliacCheck();
              updateUser();
              toggle();
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
