const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user.model");
const userController = require("../controllers/auth.controller");
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
      .withMessage("Password must be at least 5 characters long."),
  ],
  userController.signup
);

router.post(
  "/login", 
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long.")
  ],
  userController.login
);

module.exports = router;
