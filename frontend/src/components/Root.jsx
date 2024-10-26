import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useLocation, Outlet } from "react-router-dom";

function Root() {
  const { setInHome } = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setInHome(true);
    } else {
      setInHome(false);
    }
  }, [location, setInHome]);

  return (
    <>
      <Header />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Root;
