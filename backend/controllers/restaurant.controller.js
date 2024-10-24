const Restaurant = require("../models/restaurant.model");
const Review = require("../models/review.model"); // * used in populate
const Meal = require("../models/meal.model"); // * used in populate

const { getRatingObject } = require("../util/restaurant");

module.exports.getAllRestaurants = async (req, res, next) => {
  let restaurants = await Restaurant.find({});

  restaurants = await Promise.all(
    restaurants.map(async (restaurant) => {
      // ====================

      const theRestaurant = await restaurant.populate("reviews");
      const reviewsArray = theRestaurant.reviews;

      const rating = getRatingObject(reviewsArray);

      // ====================

      return {
        _id: restaurant._id,
        title: restaurant.name,
        rating: rating,
        location: restaurant.location,
        smallDescription: restaurant.smallDescription,
        tags: restaurant.tags,
        deleviryTime: restaurant.deleviryTime,
        cheapestMeal: restaurant.cheapestMeal,
        offer: restaurant.offer,
        topDish: restaurant.topDish,
      };
    })
  );

  res.status(200).json({ message: "Get all restaurants", restaurants });
};

module.exports.getRestaurantsInLocation = async (req, res, next) => {
  const { location } = req.params;

  let restaurants = await Restaurant.find({ location });

  restaurants = await Promise.all(
    restaurants.map(async (restaurant) => {
      const theRestaurant = await restaurant.populate("reviews");
      const reviewsArray = theRestaurant.reviews;

      const rating = getRatingObject(reviewsArray);

      return {
        _id: restaurant._id,
        title: restaurant.name,
        rating: rating,
        location: restaurant.location,
        smallDescription: restaurant.smallDescription,
        tags: restaurant.tags,
        deleviryTime: restaurant.deleviryTime,
        cheapestMeal: restaurant.cheapestMeal,
        offer: restaurant.offer,
        topDish: restaurant.topDish,
      };
    })
  );

  res
    .status(200)
    .json({ message: `Get all restaurants in ${location}`, restaurants });
};

module.exports.getRestaurant = async (req, res, next) => {
  const { restaurantId } = req.params;

  let restaurant = await Restaurant.findById(restaurantId)
    .populate("meals")
    .populate("reviews");

  // ====================

  const reviewsArray = restaurant.reviews;
  const reviews = {
    count: reviewsArray.length,
    reviews: reviewsArray,
  };

  // ====================

  let meals = restaurant.meals;

  meals = meals.map((meal) => {
    return {
      _id: meal._id,
      title: meal.name,
      price: meal.price,
      image: meal.image,
      description: meal.description,
    };
  });

  // ====================

  const stars = await restaurant.getRating().stars;

  restaurant = {
    _id: restaurant._id,
    logo: restaurant.logo,
    name: restaurant.name,
    location: restaurant.location,
    smallDescription: restaurant.smallDescription,
    cheapestMeal: restaurant.cheapestMeal.price,
    deleviryTime: restaurant.deleviryTime,
    tags: restaurant.tags,
    stars: stars,
    menu: meals,
    reviews: reviews,
    offer: restaurant.offer,
    topDish: restaurant.topDish,
  };

  res.status(200).json({ message: "Get restaurant", restaurant });
};
