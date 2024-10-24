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

// module.exports.deleteRestaurant = async (req, res, next) => {};

module.exports.addMeal = async (req, res, next) => {
  const { restaurantId, name, price, category, image, description } = req.body;

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

module.exports.editMeal = async (req, res, next) => {
  const { mealId } = req.params;

  const { name, price, category, image, description } = req.body;

  const meal = await Meal.findById(mealId);

  meal.name = name || meal.name;
  meal.price = price || meal.price;
  meal.category = category || meal.category;
  meal.image = image || meal.image;
  meal.description = description || meal.description;

  try {
    await meal.save();
    res.status(201).json({ message: "Meal updated successfully", meal });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports.deleteMeal = async (req, res, next) => {
  const { mealId } = req.params;

  const meal = await Meal.findById(mealId);

  const restaurantId = meal.restaurant;

  try {
    await Meal.findByIdAndDelete(mealId);
    const restaurant = await Restaurant.findById(restaurantId);
    restaurant.meals.filter((m) => m.toString() !== mealId);
    await restaurant.save();
    res.status(201).json({ message: "Meal deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
