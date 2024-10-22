const Restaurant = require("../models/restaurant.model");

module.exports.addRestaurant = async (req, res, next) => {
  const {
    name,
    logo,
    location,
    smallDescription,
    cheapestMeal,
    deleviryTime,
    topDish,
  } = req.body;

  const restaurant = new Restaurant({
    name,
    logo,
    location,
    smallDescription,
    cheapestMeal,
    deleviryTime,
    topDish,
  });

  try {
    await restaurant.save();
    res.status(201).json({ restaurant });
  } catch (error) {
    res.status(500).json({ error });
  }
};
