const Restaurant = require("../models/restaurant.model");
const Meal = require("../models/meal.model");

module.exports.addRestaurant = async (req, res, next) => {
  const {
    name,
    logo,
    location,
    smallDescription,
    cheapestMeal,
    deleviryTime,
    topDish,
    offer,
    tags,
  } = req.body;

  const restaurant = new Restaurant({
    name,
    logo,
    location,
    smallDescription,
    cheapestMeal,
    deleviryTime,
    topDish,
    offer, // not required
    tags, // not required
  });

  try {
    await restaurant.save();
    restaurant._id = restaurant._id.toString();
    res.status(201).json({ restaurant });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports.updateTags = async (req, res, next) => {
  const { restaurantId } = req.params;
  const { tags } = req.body;

  const restaurant = await Restaurant.findById(restaurantId);
  await restaurant.updateTags(tags);
};

module.exports.addMeal = async (req, res, next) => {
  const { restaurantId } = req.params;

  console.error(restaurantId);

  const { name, price, category, image, description } = req.body;

  const meal = new Meal({
    name,
    price,
    category,
    image,
    description,
    restaurant: restaurantId,
  });

  try {
    await meal.save();
    const restaurant = await Restaurant.findById(restaurantId);
    restaurant.meals.push(meal);
    await restaurant.save();
    res.status(201).json({ message: "Meal added successfully", meal });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports.editRestaurant = async (req, res, next) => {
  const { restaurantId } = req.params;

  const {
    name,
    logo,
    location,
    smallDescription,
    cheapestMeal,
    deleviryTime,
    topDish,
    offer,
    tags,
  } = req.body;

  const restaurant = await Restaurant.findById(restaurantId);

  restaurant.name = name || restaurant.name;
  restaurant.logo = logo || restaurant.logo;
  restaurant.location = location || restaurant.location;
  restaurant.smallDescription = smallDescription || restaurant.smallDescription;
  restaurant.cheapestMeal = cheapestMeal || restaurant.cheapestMeal;
  restaurant.deleviryTime = deleviryTime || restaurant.deleviryTime;
  restaurant.topDish = topDish || restaurant.topDish;
  restaurant.offer = offer || restaurant.offer;
  restaurant.tags = tags || restaurant.tags;

  try {
    await restaurant.save();
    restaurant._id = restaurant._id.toString();
    res.status(201).json({ restaurant });
  } catch (error) {
    res.status(500).json({ error });
  }
};
