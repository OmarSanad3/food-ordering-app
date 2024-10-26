const express = require("express");

const router = express.Router();

const isAuth = require("../middleware/is-auth");

const reviewController = require("../controllers/review.controller");

router.get("/user-reviews/", isAuth, reviewController.getUserReviews);

router.post("/add-review", isAuth, reviewController.addReview);

router.post("/edit-review/:reviewId", isAuth, reviewController.editReview);

router.delete(
  "/delete-review/:reviewId",
  isAuth,
  reviewController.deleteReview
);

module.exports = router;
