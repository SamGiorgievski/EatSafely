import React, { useState, useEffect } from "react";
import EditProfile from "../componetns/EditProfile";
import axios from "axios";
import "./Profile.scss";
import { useGlobalContext } from "../context";

//Function that if the sting passed is greater than nth number of char, hides the remaining after 150 and adds ...
// function truncate(string, n) {
//   return string?.length > n ? string.substr(0, n - 1) + "..." : string;

const Profile = ({ getIntolerances, showModal, setShowModal, toggleModal }) => {
  const [intolerances, setIntolerances] = useState([]);
  const { storedData, setStoredData } = useGlobalContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data) {
      setStoredData(data);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && storedData) {
      axios
        .post("/intolerances", {
          sessionData: storedData.data.user.id,
        })
        .then((res) => {
          if (res.data.rows[0].intolerance) {
            setIntolerances(res.data.rows[0].intolerance);
            getIntolerances(res.data.rows[0].intolerance);
          }
        })
        .catch((err) => console.error(err.response.data));
    }
  }, [storedData, loading, getIntolerances]);

  return (
    <>
      {storedData && storedData.data && (
        <section>
          <div className="card">
            <img
              className="card-img-top"
              src="https://t3.ftcdn.net/jpg/02/94/69/02/360_F_294690239_ydek2JMXB9aeQcYY05jVewc0xocZrCNg.jpg"
              alt="veg"
            />
            <div className="card-body">
              <h3 className="h2 text-black mb-0 user--name">{`${storedData.data.user.first_name} ${storedData.data.user.last_name}`}</h3>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                First Name: {storedData.data.user.first_name}
              </li>
              <li className="list-group-item">
                Last Name: {storedData.data.user.last_name}
              </li>
              <li className="list-group-item">
                Email: {storedData.data.user.email}
              </li>
              <li className="list-group-item">Intolerances: {intolerances}</li>
            </ul>
            <div className="card-body">
              <div>
                <button onClick={toggleModal} className="btn btn-primary">
                  Edit
                </button>
              </div>

              {showModal && (
                <EditProfile
                  toggle={toggleModal}
                  state={(showModal, setShowModal)}
                  storedData={storedData}
                  setIntolerances={setIntolerances}
                />
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Profile;
