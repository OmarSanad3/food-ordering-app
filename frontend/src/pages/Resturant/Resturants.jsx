import Card from "../../components/Card/Card";
import SideBar from "../../components/SideBar/SideBar";
import { Link } from "react-router-dom";
function RestaurantPage() {
  return (
    <div className="row restaurant-page mt-5">
      <div className="col-2">
        <SideBar />
      </div>

      <div className="container text-center col-md-10 col-sm-12">
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
        <button className="btn btn-warning mt-5 w-100">Load More</button>
      </div>
    </div>
  );
}

export default RestaurantPage;
