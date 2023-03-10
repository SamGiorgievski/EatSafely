import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from './pages/Login';
import Register from './pages/Register';
import ScanImage from './pages/ScanImage';
import Translate from "./pages/Translate";
import Recipe from "./pages/Recipe";
import Profile from './pages/Profile';
import EditProfile from "./componetns/EditProfile";
import { AppProvider } from "./context";


export default function App() {
  const [intolerances, setIntolerances] = useState([]);
  const [showModal, setShowModal] = useState(false);


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
            <Route path="/recipes" element={<Recipe />} />
            <Route path="/scanimage" element={<ScanImage
              intolerances={intolerances}
              setIntolerances={setIntolerances}
              showModal={showModal}
              setShowModal={setShowModal}
              toggleModal={toggleModal}

            />} />
            <Route path="/login" element={<Login

            />} />
            <Route path="/travelcard" element={<Translate intolerances={intolerances} />} />
            <Route path="/profile" element={<Profile
              getIntolerances={setIntolerances}
              showModal={showModal}
              setShowModal={setShowModal}
              toggleModal={toggleModal}

            />} />

          </Route>
          <Route path="/recipes" element={<Recipe />} />

        </Routes>
      </BrowserRouter>
    </AppProvider >
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);