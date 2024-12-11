const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user.model");
const isAuth = require("../middleware/is-auth");
const cartController = require("../controllers/cart.controller")

const router = express.Router();

router.get("/cart", isAuth, cartController.getCart);

router.post("/add-to-cart", isAuth, cartController.addToCart);

router.delete(
  "/remove-from-cart/:mealId",
  isAuth,
  cartController.removeFromCart
);

router.delete("/clear-cart", isAuth, cartController.clearCart);

module.exports = router;
