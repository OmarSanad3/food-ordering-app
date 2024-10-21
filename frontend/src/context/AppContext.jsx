import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [inHomePage, setInHomePage] = useState(true);
  const [search, setSearch] = useState("");

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
        search,
        setSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
