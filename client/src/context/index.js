
import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext(null);

const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true" ? true : false
  );

  const [storedData, setStoredData] = useState(
    JSON.parse(localStorage.getItem("userData")) || {}
  );

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(storedData));
  }, [storedData]);

  const value = {
    isLoggedIn,
    setIsLoggedIn: (value) => {
      localStorage.setItem("isLoggedIn", value);
      setIsLoggedIn(value);
    },
    storedData,
    setStoredData: (value) => {
      setStoredData(value);
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };