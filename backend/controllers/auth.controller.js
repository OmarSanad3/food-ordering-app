const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const Meal = require("../models/meal.model");
const Order = require("../models/order.model");
const Restaurant = require("../models/restaurant.model");
const Review = require("../models/review.model");

const stripe = require('stripe')('sk_test_51QD6qNDntxRgMHhGwYb7wc61SfMlvx4M8v0giXpzEuqQKdaAyRbykU2uYD5Bf5hNDdvZxSQl9RC0eTklpH40aIwT00rggDr27l');


exports.login = async (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const e = errors.array();
    const error = new Error(e[0].msg);
    error.statusCode = 422;
    return next(error);
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      const error = new Error("A user with this email could not be found.");
      error.statusCode = 401;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      "this_is_secret_key",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Logged In Successfully",
      token,
      userId: user._id.toString(),
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const e = errors.array();
    const error = new Error(e[0].msg);
    error.statusCode = 422;
    return next(error);
  }

  const { firstName, lastName, email, phoneNumber, password, confirmPassword } =
    req.body;

  if (password != confirmPassword) {
    const error = new Error("Password and confirm password do not match");
    error.statusCode = 404;
    return next(error);
  }

  try {
    const hashedPw = await bcrypt.hash(password, 12);

    const user = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPw,
      confirmPassword: hashedPw,
    });

    await user.save();

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      "this_is_secret_key",
      { expiresIn: "1h" }
    );

    res
      .status(201)
      .json({ message: "User created!", token, userId: user._id.toString() });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
