// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.scss';
// import App from './App';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from './pages/Login';
import Register from './pages/Register';
import ScanImage from './pages/ScanImage';
import Profile from './pages/Profile';
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
          {/* <Route path="/logout" element={<Login />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
    </AppProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);