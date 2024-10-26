const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });

const User = require("../models/user.model");
const Meal = require("../models/meal.model");
const Order = require("../models/order.model");
const Restaurant = require("../models/restaurant.model");
const Review = require("../models/review.model");

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const stripe = require('stripe')(STRIPE_SECRET_KEY);

exports.getOrders = async (req, res, next) => {
  const userId = req.userId;

  try {

    if (req.query.payment === 'success') {
      await addOrder(userId);
    }

    const orders = await Order.find({ user: userId });

    res.status(200).json({ message: "Orders retrieved", orders });
  } catch (err) {
    next(err);
  }
};

exports.getCheckout = async (req, res, next) => {
  const userId = req.userId;

  const cart = await User.findById(userId).populate("cart.mealId");

  if (!cart || !cart.cart.length) {
    return res.status(404).json({ message: "There is No Meals in The Cart" });
  }

  const meals = cart.cart;
  
  
  const lineItems = meals.map(m => {

    const price = (+m.mealId.price * +m.quantity) * 100;
    const image = m.mealId.image;

    return {
      price_data: {
        currency: 'EGP',
        product_data: {
          name: m.mealId.name,
          description: m.mealId.description,
          images: ['https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D']
        },
        unit_amount: price
      },
      quantity: m.quantity
    };
  });

  const { url } = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: req.protocol + '://' + req.get('host') + '/orders?payment=success',
    cancel_url: req.protocol + '://' + req.get('host')
  });

  res.status(200).json({message: "Stripe Links Sent", url});
};

const addOrder = async (userId) => {
    const user = await User.findById(userId);
    const cart = await user.populate("cart.mealId");
  
    let totalPrice = 0;

    if (!cart.cart.length) {
      throw new Error("No meals found in the cart"); 
    }

    const meals = cart.cart.map((c) => {
      totalPrice += +c.quantity * +c.mealId.price;
      return {
        meal: c.mealId,
        quantity: c.quantity,
      };
    });
  
    const order = new Order({
      user: userId,
      meals,
      totalPrice,
    });
  
    await order.save();
    await user.addorder(order);

    return order;
};