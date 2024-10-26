import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  // const [isRegistered, setIsRegistered] = useState(false);
  const [inHomePage, setInHomePage] = useState(true);
  const [search, setSearch] = useState("");
  const [Token, setToken] = useState(null)
  useEffect(() => {
    const val=localStorage.getItem("tkn")
    if(val !=null){
      setToken(val)
    } 
  }, [])
  const setInHome = (status) => setInHomePage(status);

  return (
    <AppContext.Provider
      value={{
        
        inHomePage,
        setInHome,
        search,
        setSearch,
        mytoken:Token,
        setToken
      }}
    >
      {children}
    </AppContext.Provider>
  );
}