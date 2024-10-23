import Card from "../../components/Card/Card";
import SideBar from "../../components/SideBar/SideBar";
import { Link } from "react-router-dom";
import { useContext, useState, useCallback } from "react";
import { AppContext } from "../../context/AppContext";
const restaurantCardArray = [
  {
    _id: "1",
    title: "Bufflo",
    rating: {
      stars: 4,
      reviewsCount: 3981,
    },
    location: "Made in Egypt",
    smallDescription: "A wide selection of Chinese-inspired burgers.",
    tags: ["Burger"],
    deleviryTime: 60,
    cheapestMeal: {
      name: "Classic Burger",
      price: 7.99,
    },
    topDish: {
      name: "Buffalo Burger",
      image: "https://example.com/buffalo-burger.png",
      price: 12.99,
    },
  },
  {
    _id: "2",
    title: "Amr Elsoury",
    rating: {
      stars: 4.5,
      reviewsCount: 3081,
    },
    location: "Made in Egypt",
    smallDescription: "Authentic Shawerma with traditional spices.",
    tags: ["Shawerma"],
    deleviryTime: 60,
    cheapestMeal: {
      name: "Chicken Shawerma",
      price: 6.99,
    },
    topDish: {
      name: "Beef Shawerma",
      image: "https://example.com/beef-shawerma.png",
      price: 11.99,
    },
  },
  {
    _id: "3",
    title: "KFC",
    rating: {
      stars: 3.5,
      reviewsCount: 3908,
    },
    location: "Made in Egypt",
    smallDescription: "Crispy fried chicken and sides.",
    tags: ["Fried Chicken"],
    deleviryTime: 40,
    cheapestMeal: {
      name: "2 Piece Chicken",
      price: 8.99,
    },
    topDish: {
      name: "Bucket of Chicken",
      image: "https://example.com/kfc-bucket.png",
      price: 25.99,
    },
  },
  {
    _id: "4",
    title: "Subway",
    rating: {
      stars: 4,
      reviewsCount: 3981,
    },
    location: "Made in Egypt",
    smallDescription: "Freshly made subs with a variety of toppings.",
    tags: ["Pizza"],
    deleviryTime: 30,
    cheapestMeal: {
      name: "Veggie Sub",
      price: 5.99,
    },
    topDish: {
      name: "Chicken Teriyaki Sub",
      image: "https://example.com/subway-teriyaki.png",
      price: 9.99,
    },
  },
  {
    _id: "5",
    title: "Oldies",
    rating: {
      stars: 2,
      reviewsCount: 9081,
    },
    location: "Made in Egypt",
    smallDescription: "Classic burgers with a retro vibe.",
    tags: ["Burger"],
    deleviryTime: 40,
    cheapestMeal: {
      name: "Cheeseburger",
      price: 6.99,
    },
    topDish: {
      name: "Double Oldie Burger",
      image: "https://example.com/oldies-double.png",
      price: 11.99,
    },
  },
  {
    _id: "6",
    title: "Moodes",
    rating: {
      stars: 4,
      reviewsCount: 81,
    },
    location: "Made in Egypt",
    smallDescription: "Delicious gourmet burgers.",
    tags: ["Burger"],
    deleviryTime: 65,
    cheapestMeal: {
      name: "Mushroom Burger",
      price: 9.99,
    },
    topDish: {
      name: "Moodes Special Burger",
      image: "https://example.com/moodes-special.png",
      price: 12.99,
    },
  },
  {
    _id: "7",
    title: "Koshary Shawky",
    rating: {
      stars: 4,
      reviewsCount: 101,
    },
    location: "Made in Egypt",
    smallDescription: "Traditional Egyptian Koshary.",
    tags: ["Koshary"],
    deleviryTime: 20,
    cheapestMeal: {
      name: "Small Koshary",
      price: 2.99,
    },
    topDish: {
      name: "Large Koshary",
      image: "https://example.com/large-koshary.png",
      price: 5.99,
    },
  },
];

function RestaurantPage() {
  const { search } = useContext(AppContext);

  const [selectedOption, setSelectedOption] = useState("Popular");
  const [selectedDish, setSelectedDish] = useState("All");
  const [sortedCards, setSortedCards] = useState(restaurantCardArray);

  const handleSortChange = useCallback((option) => {
    setSelectedOption(option);
    let sortedArray = [...restaurantCardArray];
    if (option === "Rating") {
      sortedArray.sort((a, b) => b.rating.stars - a.rating.stars);
    } else if (option === "Delivery") {
      sortedArray.sort((a, b) => a.deleviryTime - b.deleviryTime);
    } else {
      sortedArray.sort((a, b) => b.rating.reviewsCount - a.rating.reviewsCount);
    }
    setSortedCards(sortedArray);
  }, []);

  const handleSelectedDish = useCallback((dish) => {
    setSelectedDish(dish);
  }, []);

  const filterCards = (cards, selectedDish, search) => {
    return cards.filter((item) => {
      return (
        (selectedDish === "All" ||  item.tags.includes(selectedDish)) &&
        (search.toLowerCase() === "" ||
          item.title.toLowerCase().includes(search.toLowerCase()))
      );
    });
  };

  const filteredCards = filterCards(sortedCards, selectedDish, search);

  // const [products, setproducts] = useState(null)
  // async function getProducts(){
  //   await axios.get(`localhost:3000/restaurants`).then((res)=>{
  //     setproducts(res.data.data)
  //     console.log(res.data.data);

  //   }).catch((err)=>{
  //     console.log(err);

  //   })
  // }
  // useEffect(() => {
  //   getProducts()

  // }, [])

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
                <Link to={`/menu/${restaurant._id}`}>
                  <Card  title = {restaurant.title} stars = {restaurant.rating.stars} reviews = {restaurant.rating.reviewsCount} deliveryTime = {restaurant.deleviryTime} location = {restaurant.location} />
                </Link>
              </div>
            ))
          ) : (
            <h1>No Restaurants Found</h1>
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
