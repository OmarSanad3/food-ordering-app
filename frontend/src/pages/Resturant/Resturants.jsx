import Card from "../../components/Card/Card";
import SideBar from "../../components/SideBar/SideBar";
import { Link } from "react-router-dom";
import { useContext, useState, useCallback, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import Loader from "../../components/Loader/Loader";
import axios from "axios";

function RestaurantPage() {
  const { search } = useContext(AppContext);

  const [selectedOption, setSelectedOption] = useState("Popular");
  const [selectedDish, setSelectedDish] = useState("All");
  const [sortedCards, setSortedCards] = useState([]);

  async function getProducts() {
    await axios
      .get(`http://localhost:3000/restaurants`)
      .then((res) => {
        setSortedCards(res.data.restaurants);
        console.log(res.data.restaurants);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getProducts();
  }, []);

  const handleSortChange = useCallback(
    (option) => {
      setSelectedOption(option);
      let sortedArray = [...sortedCards];
      if (option === "Rating") {
        sortedArray.sort((a, b) => b.rating.stars - a.rating.stars);
      } else if (option === "Delivery") {
        sortedArray.sort((a, b) => a.deleviryTime - b.deleviryTime);
      } else {
        sortedArray.sort(
          (a, b) => b.rating.reviewsCount - a.rating.reviewsCount
        );
      }
      setSortedCards(sortedArray);
    },
    [sortedCards]
  );

  const handleSelectedDish = useCallback((dish) => {
    setSelectedDish(dish);
  }, []);

  const filterCards = (cards, selectedDish, search) => {
    return cards.filter((item) => {
      return (
        (selectedDish === "All" || item.tags.includes(selectedDish)) &&
        (search.toLowerCase() === "" ||
          item.title.toLowerCase().includes(search.toLowerCase()))
      );
    });
  };

  const filteredCards = filterCards(sortedCards, selectedDish, search);

  return (
    <div className="row restaurant-page mt-5">
      <div className="col-2">
        <SideBar
          selectedOption={selectedOption}
          selectedDish={selectedDish}
          handleSortChange={handleSortChange}
          handleSelectDish={handleSelectedDish}
        />
      </div>

      <div className="container text-center col-md-10 col-sm-12">
        <div className="row g-4 ">
          {filteredCards.length > 0 ? (
            filteredCards.map((restaurant) => (
              <div className="col" key={restaurant._id}>
                <Link to={`/restaurant/${restaurant._id}`}>
                  <Card
                    title={restaurant.title}
                    stars={restaurant.rating.stars}
                    reviews={restaurant.rating.reviewsCount}
                    deliveryTime={restaurant.deleviryTime}
                    location={restaurant.location}
                  />
                </Link>
              </div>
            ))
          ) : (
            <Loader />
          )}
        </div>
        {filteredCards.length > 0 && (
          <button className="btn btn-warning mt-5 w-100">Load More</button>
        )}
      </div>
    </div>
  );
}

export default RestaurantPage;
