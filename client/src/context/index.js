import React, { useContext, useState } from "react";


const AppContext = React.createContext(null);

const AppProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
      {children}
    </AppContext.Provider>
  )
};

export const useGlobalContext = () => {
  return useContext(AppContext);
}

export {
  AppContext,
  AppProvider
};