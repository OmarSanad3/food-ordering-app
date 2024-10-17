import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [inRestaurantPage, setInRestaurantPage] = useState(false);

  function toggleRegistration() {
    setIsRegistered((prev) => !prev);
  }

  const setRestaurantPage = (status) => setInRestaurantPage(status);

  return (
    <AppContext.Provider
      value={{
        isRegistered,
        toggleRegistration,
        inRestaurantPage,
        setRestaurantPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
