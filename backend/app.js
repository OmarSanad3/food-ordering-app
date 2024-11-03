const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const adminRoutes = require("./routes/admin.routes");
const restaurantRoutes = require("./routes/restaurant.routes");
const userRoute = require("./routes/user.routes");
const reviewRoutes = require("./routes/review.routes");

const DB_URI = process.env.DB_URI;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(userRoute);
app.use(restaurantRoutes);
app.use("/admin", adminRoutes);
app.use(reviewRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message });
});

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected to the database 🚀");
    app.listen(3000, () => {
      console.log("Server is running on port 3000 🚀");
    });
  })
  .catch();

/* 

  fetch in js

  await fetch("await fetch("localhost:3000/restaurants").
    (res => res.json()).
    (restaurants => setSortedCards(restaurants)).catch(err => console.log(err));

*/
