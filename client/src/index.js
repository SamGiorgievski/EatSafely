import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from './pages/Login';
import Register from './pages/Register';
import ScanImage from './pages/ScanImage';
import Translate from "./pages/Translate";
import Profile from './pages/Profile';
import EditProfile from "./componetns/EditProfile";
import { AppProvider } from "./context";

export default function App() {
  const [intolerances, setIntolerances] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [storedData, setStoredData] = useState(
    JSON.parse(sessionStorage.getItem("userData"))
  );

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  function NotFound() {
    return <h3>Page Not Found</h3>;
  };


  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/register" element={<Register />} />
            <Route path="/scanimage" element={<ScanImage 
            intolerances={intolerances}
            setIntolerances={setIntolerances}
            showModal={showModal}
            setShowModal={setShowModal}
            toggleModal={toggleModal}
            storedData={storedData}
             />} />
            <Route path="/login" element={<Login />} />
            <Route path="/travelcard" element={<Translate intolerances={intolerances} />} />
            <Route path="/profile" element={<Profile 
            getIntolerances={setIntolerances}
            showModal={showModal}
            setShowModal={setShowModal}
            toggleModal={toggleModal}
            storedData={storedData}
            setStoredData={setStoredData}
             />} />

          </Route>


        </Routes>
      </BrowserRouter>
    </AppProvider >
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);