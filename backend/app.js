const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const adminRoutes = require("./routes/admin.routes");
const restaurantRoutes = require("./routes/restaurant.routes");

const DB_URI = process.env.DB_URI;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");
  next();
});

app.use("/admin", adminRoutes);
app.use(restaurantRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
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
