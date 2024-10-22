const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const DB_URI = process.env.DB_URI;

const app = express();

app.use((req, res, next) => {
  res.status(200).json({
    message: "It works!",
  });
});

mongoose
  .connect(DB_URI)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch();
