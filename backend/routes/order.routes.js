const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user.model");
const orderController = require("../controllers/order.controller");
const isAuth = require("../middleware/is-auth");

const router = express.Router();


router.get("/orders", isAuth, orderController.getOrders);

router.get('/checkout', isAuth, orderController.getCheckout);

module.exports = router;
