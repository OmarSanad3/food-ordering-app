const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin.controller");

router.post("/add-restaurant", adminController.addRestaurant);

router.post("/update-tags/:restaurantId", adminController.updateTags);

router.post("/add-meal/:restaurantId", adminController.addMeal);

// router.post('/add-meal', adminController.addMeal);

router.post("/edit-restaurant/:restaurantId", adminController.editRestaurant);

module.exports = router;
