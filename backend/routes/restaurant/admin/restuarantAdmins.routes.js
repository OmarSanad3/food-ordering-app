const express = require('express');

const router = express.Router();

const adminController = require('../../../controllers/admin.controller');

router.post('/add-restaurant', adminController.addRestaurant);

router.post('/add-meal', adminController.addMeal);

router.put('/edit-restaurant', adminController.editRestaurant);