const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const Meal = require('../models/meal.model');
const Order = require('../models/order.model');
// const stripe = require('stripe')('sk_test_51QD6qNDntxRgMHhGwYb7wc61SfMlvx4M8v0giXpzEuqQKdaAyRbykU2uYD5Bf5hNDdvZxSQl9RC0eTklpH40aIwT00rggDr27l');



exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  const { firstName, lastName, email, password } = req.body;

  try {
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPw
    });
    
    const result = await user.save();

    res.status(201).json({ message: 'User created!', userId: result._id });
  } catch (err) {
    if (!err.statusCode) { 
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }
    
    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString()
      },
      'this_is_secret_key',
      { expiresIn: '1h' }
    );

    res.status(200).json({ token: token, userId: user._id.toString() });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getCart = async (req, res, next) => {
  const userId = req.userId;

  const user = await User.findById(userId).populate('cart.mealId');

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json({ cart: user.cart });
}

exports.postCart = async (req, res, next) => {
  const mealId = req.body.mealId;
  const userId = req.userId;

  const meal = await Meal.findById(mealId);

  if (!meal) {
    return res.status(404).json({ message: 'Meal not found' });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  await user.addToCart(meal);

  return res.status(200).json({ message: 'Added Meal To Cart Successfully' });
}

exports.deleteMeal = async (req, res, next) => {
  const userId = req.userId;
  const mealId = req.body.mealId;

  const meal = await Meal.findById(mealId);

  if (!meal) {
    return res.status(404).json({ message: 'Meal not found' });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  const message = await user.removeFromCart(mealId);

  return res.status(200).json({ message });
}

exports.deleteClearCart = async (req, res, next) => {
  const userId = req.userId;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  await user.clearCart();

  return res.status(200).json({message: "Cart is Cleared Successfully"});
}

exports.addOrder = async (req, res, next) => {
  const userId = req.userId;

  const user = await User.findById(userId);
  const cart = await user.populate('cart.mealId');

  let totalPrice = 0;

  if(!cart.cart.length) {
    return res.status(404).json({ message: 'Nothing Meals Found in The Cart' });
  }

  const meals = cart.cart.map(c => {
    totalPrice += +c.quantity * +c.mealId.price;
    return {
      meal: c.mealId,
      quantity: c.quantity
    }
  });


  // const checkout = await stripe.checkout.sessions.create({
  //   payment_method_types: ['card'],
  //   line_items: meals.map(m => {
  //     return {
  //       name: 
  //     }
  //   })
  // })

  const order = new Order({
    user: userId,
    meals,
    totalPrice
  });

  await order.save();
  await user.addorder(order);

  res.status(200).json({ message: "Order Done", order });
}

exports.getOrders = async (req, res, next) => {
  const userId = req.userId;

  const user = await User.findById(userId).populate('orders');

  if (!user || !user.orders.length) {
    return res.status(404).json({ message: 'No orders found' });
  }

  const orders = await Promise.all(user.orders.map(async order => {
    const meal = await Order.findById(order._id).populate('meals.meal');;
    return meal;
  }));

  return res.status(200).json({message: "Orders retrieved successfully", orders});
}