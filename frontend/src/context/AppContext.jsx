import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [isRegistered, setIsRegistered] = useState(true);
  const [inHomePage, setInHomePage] = useState(true);

  function toggleRegistration() {
    setIsRegistered((prev) => !prev);
  }

  const setInHome = (status) => setInHomePage(status);

  return (
    <AppContext.Provider
      value={{
        isRegistered,
        toggleRegistration,
        inHomePage,
        setInHome,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
