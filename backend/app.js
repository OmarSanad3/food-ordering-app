const express = require("express");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoute = require('./routes/user.routes');

dotenv.config({ path: "./config.env" });

const DB_URI = process.env.DB_URI;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(userRoute);

app.use((req, res, next) => {
  res.status(200).json({
    message: "It works!",
  });
});

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});


mongoose
  .connect(DB_URI)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch();
