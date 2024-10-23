const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user.model");
const userController = require("../controllers/user.controller");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (value) => {
        const userDoc = await User.findOne({ email: value });

        if (userDoc) {
          throw new Error("E-Mail address already exists!");
        }

        return true;
      })
      .normalizeEmail(),
    body("phoneNumber")
      .trim()
      .matches(/^01[0125][0-9]{8}$/)
      .withMessage("Please enter a valid Egyptian phone number."),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long.")
  ],
  userController.signup
);

router.get("/cart", isAuth, userController.getCart);

router.get("/orders", isAuth, userController.getOrders);

// router.get('/checkout', isAuth, userController.getCheckout);

router.post("/login", userController.login);

router.post("/add-to-cart", isAuth, userController.addToCart);

router.post("/order", isAuth, userController.addOrder);

router.delete("/remove-from-cart/:mealId", isAuth, userController.removeFromCart);

router.delete("/clear-cart", isAuth, userController.clearCart);

module.exports = router;
