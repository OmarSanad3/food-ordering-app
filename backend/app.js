const express = require("express");

const app = express();

app.use((req, res, next) => {
  res.status(200).json({
    message: "It works!",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

