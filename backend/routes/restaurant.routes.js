const express = require("express");

const router = express.Router();

const restaurantController = require("../controllers/restaurant.controller");

router.get("/restaurants", restaurantController.getAllRestaurants);

router.get("/restaurants/:location", restaurantController.getRestaurantsInLocation);

router.get("/restaurant/:restaurantId", restaurantController.getRestaurant);

module.exports = router;
