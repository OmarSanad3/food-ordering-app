const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

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