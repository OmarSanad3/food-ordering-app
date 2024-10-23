const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user.model');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post( '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom(async (value) => {
        const userDoc = await User.findOne({ email: value });

        if (userDoc) {
          throw new Error('E-Mail address already exists!');
        }

        return true;
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 characters long.')
  ],
  userController.signup
);

router.post('/login', userController.login);

module.exports = router;