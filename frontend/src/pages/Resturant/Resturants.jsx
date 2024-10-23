import Card from "../../components/Card/Card";
import SideBar from "../../components/SideBar/SideBar";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
const cardArray = [
  {
    id: 1,
    title: "Bufflo",
    stars: 4,
    reviews: 3981,
    offer: null,
    deliveryTime: 60,
    location: "Made in Egypt • Chinese",
    category: "Burger",
  },
  {
    id: 2,
    title: "Amr Elsoury",
    stars: 4.5,
    reviews: 3081,
    offer: null,
    deliveryTime: 60,
    location: "Made in Egypt • Chinese",
    category: "Shawerma",
  },
  {
    id: 3,
    title: "KFC",
    stars: 3.5,
    reviews: 3908,
    offer: "40 EGP on orders above 150 EGP",
    deliveryTime: 40,
    location: "Made in Egypt • Chinese",
    category: "Fried Chicken",
  },
  {
    id: 4,
    title: "Subway",
    stars: 4,
    reviews: 3981,
    offer: null,
    deliveryTime: 30,
    location: "Made in Egypt • Chinese",
    category: "Pizza",
  },
  {
    id: 5,
    title: "Oldies",
    stars: 2,
    reviews: 9081,
    offer: "40% off on orders above 150 EGP",
    deliveryTime: 40,
    location: "Made in Egypt • Chinese",
    category: "Burger",
  },
  {
    id: 6,
    title: "Moodes",
    stars: 4,
    reviews: 81,
    offer: null,
    deliveryTime: 65,
    location: "Made in Egypt • Chinese",
    category: "Burger",
  },
  {
    id: 7,
    title: "Koshary shawky",
    stars: 4,
    reviews: 101,
    offer: null,
    deliveryTime: 20,
    location: "Made in Egypt • Chinese",
    category: "Koshary",
  },
];

function RestaurantPage() {
  const { search } = useContext(AppContext);

  const [selectedOption, setSelectedOption] = useState("Popular");
  const [selectedDish, setSelectedDish] = useState("All");

  const [sortedCards, setSortedCards] = useState(cardArray);

  const handleSortChange = (option) => {
    setSelectedOption(option);
    let sortedArray = [...cardArray];
    if (option === "Rating") {
      sortedArray.sort((a, b) => b.stars - a.stars);
    } else if (option === "Delivery") {
      sortedArray.sort((a, b) => a.deliveryTime - b.deliveryTime);
    } else {
      sortedArray.sort((a, b) => b.reviews - a.reviews);
    }
    setSortedCards(sortedArray);
  };

  const handleSelectedDish = (dish) => {
    setSelectedDish(dish);
  };

  const filterCards = (cards, selectedDish, search) => {
    return cards.filter((item) => {
      return (
        (selectedDish === "All" || item.category === selectedDish) &&
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
            filteredCards.map((card) => (
              <div className="col" key={card.id}>
                <Link to="menu">
                  <Card {...card} />
                </Link>
              </div>
            ))
          ) : (
            <h1>No Restaurants Found</h1>
          )}
        </div>
        <button className="btn btn-warning mt-5 w-100">Load More</button>
      </div>
    </div>
  );
}

export default RestaurantPage;