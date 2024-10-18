import { useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Card from "../../components/Card/Card";
import SideBar from "../../components/SideBar/SideBar";
import { Link } from "react-router-dom";
function RestaurantPage() {
  // Access the context to update the `inRestaurantPage` state
  const { setRestaurantPage } = useContext(AppContext);

  // Using useEffect to set the page status when the component mounts and unmounts
  useEffect(() => {
    setRestaurantPage(true); // Set `inRestaurantPage` to true when the page loads

    return () => {
      setRestaurantPage(false); // Set `inRestaurantPage` to false when the page unloads
    };
  }, [setRestaurantPage]);

  return (
    <div className="row restaurant-page mt-5">
      <div className="col-3">
        <SideBar />
      </div>

      <div className="container text-center col-9">
        <div className="row g-4 ">
          <div className="col ">
           <Link to = "menu" >  <Card /> </Link>
          </div>
          <div className="col ">
            <Card />
          </div>
          <div className="col ">
            <Card />
          </div>
          <div className="col ">
            <Card />
          </div>
          <div className="col ">
            <Card />
          </div>
          <div className="col ">
            <Card />
          </div>
          <div className="col ">
            <Card />
          </div>
          <div className="col ">
            <Card />
          </div>
          <div className="col ">
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantPage;
