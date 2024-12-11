const User = require("../models/user.model");
const Meal = require("../models/meal.model");
const Order = require("../models/order.model");
const Restaurant = require("../models/restaurant.model");
const Review = require("../models/review.model");


exports.getCart = async (req, res, next) => {
  const userId = req.userId;

  const user = await User.findById(userId).populate("cart.mealId");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res
    .status(200)
    .json({ message: "Cart retrieved successfully", cart: user.cart });
};

exports.addToCart = async (req, res, next) => {
  const mealId = req.body.mealId;
  const userId = req.userId;

  const meal = await Meal.findById(mealId);

  if (!meal) {
    return res.status(404).json({ message: "Meal not found" });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await user.addToCart(meal);

  return res.status(200).json({ message: "Added Meal To Cart Successfully" });
};

exports.removeFromCart = async (req, res, next) => {
  const userId = req.userId;
  const mealId = req.params.mealId;

  const meal = await Meal.findById(mealId);

  if (!meal) {
    return res.status(404).json({ message: "Meal not found" });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const message = await user.removeFromCart(mealId);

  return res.status(200).json({ message });
};

exports.clearCart = async (req, res, next) => {
  const userId = req.userId;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await user.clearCart();

  return res.status(200).json({ message: "Cart is Cleared Successfully" });
};

