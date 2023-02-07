import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from './pages/Login';
import Register from './pages/Register';
import ScanImage from './pages/ScanImage';
import Profile from './pages/Profile';
import EditProfile from "./componetns/EditProfile";
import { AppProvider } from "./context";



export default function App() {


  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/register" element={<Register />} />
            <Route path="/scanimage" element={<ScanImage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />

          </Route>


        </Routes>
      </BrowserRouter>
    </AppProvider >
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);