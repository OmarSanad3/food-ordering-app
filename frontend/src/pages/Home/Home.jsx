import classes from "./Home.module.css";
import {  useNavigate } from "react-router-dom";
import { useState } from "react";
import img from "../../assets/dish1.webp";
import axios from "axios";
export default function Home() {
  const [selectedOption, setSelectedOption] = useState("Cairo");
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  
  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/restaurants/${selectedOption}`);
      if (response.data) {
        navigate(`/restaurants/${selectedOption}`);
      } else {
        console.log('Restaurant not found');
      }
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
    }
  };
  return (
    <div className="container">
      <div className={classes.overlay}>
        <div className={classes.backgroundImage}>
          <img src={img} alt="dish" />
        </div>
        <div className={`${classes.maxWidth} text-center text-light`}>
          <h1 className={`fw-bold mt-md-5 pt-5 ${classes.sectionTitle}`}>
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
                value={selectedOption}
                onChange={handleSelectChange}
              >
                <option value="Cairo">Cairo</option>
                <option value="Port-Said">Portsaid</option>
                <option value="Alexandria">Alexandria</option>
                <option value="Elmansura">Elmansura</option>
              </select>
            </div>
            <div className="col-md-2 col-lg-1 col-sm-2">
                <button
                  className="btn btn-warning"
                  type="button"
                  onClick={handleSearch}
                >
                  Search
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
