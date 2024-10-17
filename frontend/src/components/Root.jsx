import Header from "./Header/Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
function Root() {
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
