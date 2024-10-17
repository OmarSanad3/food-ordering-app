import classes from "./Home.module.css";
import { Link } from "react-router-dom";
import img from "../../assets/dish1.jpg";
export default function Home() {
  return (
    <div className="container">
      <div className={classes.overlay}>
        <div>
          <img src={img} alt="dish" />
        </div>
        <div className={`${classes.maxWidth} text-center text-light`}>
          <h1 className={`fw-bold mt-5 pt-5 ${classes.sectionTitle}`}>
            Discover & Order the food you love.
          </h1>
        </div>
        <div className="mt-5 m-auto text-center">
          <div className={`row justify-content-center m-auto `}>
            <form
              className="col-md-4 col-lg-3 col-sm-5 mb-3 mb-md-0 p-0"
              role="search"
            >
              <input
                className={`form-control`}
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
            <div className="col-md-2 col-lg-2 col-sm-3 mb-3 mb-md-0 ">
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>City</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-md-2 col-lg-1 col-sm-2">
              <button className="btn btn-warning " type="submit">
                <Link className="nav-link" to="/resturants">
                  Search
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
