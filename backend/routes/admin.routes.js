const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin.controller");

router.post("/add-restaurant", adminController.addRestaurant);

router.post("/edit-restaurant/:restaurantId", adminController.editRestaurant);

// router.delete("/delete-restaurant/:restaurantId", adminController.deleteRestaurant);

// ================================================

router.post("/add-meal/", adminController.addMeal);

router.post("/edit-meal/:mealId", adminController.editMeal);

router.delete("/delete-meal/:mealId", adminController.deleteMeal);

module.exports = router;
