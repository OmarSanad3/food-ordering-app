const User = require("../models/user.model");
const Meal = require("../models/meal.model");
const Order = require("../models/order.model");
const Restaurant = require("../models/restaurant.model");
const Review = require("../models/review.model");

exports.addReview = async (req, res, next) => {
  const userId = req.userId;
  const { restaurantId, stars, feedback } = req.body;

  if (!restaurantId) {
    return res.status(404).json({ message: "Restaurant ID is required" });
  }

  if (!stars) {
    return res.status(404).json({ message: "Stars is required" });
  }

  if (stars < 0 || stars > 5) {
    return res.status(404).json({ message: "Stars must be between 0 and 5" });
  }

  if (!feedback) {
    return res.status(404).json({ message: "Feedback is required" });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const restaurant = await Restaurant.findById(restaurantId);

  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }

  const assignedReview = await Review.findOne({ user: userId });

  if (assignedReview && assignedReview.restaurant.toString() === restaurantId) {
    return res
      .status(404)
      .json({ message: "You already reviewed this restaurant" });
  }

  const review = new Review({
    restaurant: restaurantId,
    user: userId,
    stars,
    feedback,
  });

  await review.save();

  restaurant.reviews.push(review._id);

  await restaurant.save();

  return res.status(200).json({ message: "Review added successfully", review });
};

exports.editReview = async (req, res, next) => {
  const userId = req.userId;
  const reviewId = req.params.reviewId;

  const { restaurantId, stars, feedback } = req.body;

  if (!restaurantId) {
    return res.status(404).json({ message: "Restaurant ID is required" });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const restaurant = await Restaurant.findById(restaurantId);

  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }

  const review = await Review.findById(reviewId);

  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  review.stars = stars || review.stars;
  review.feedback = feedback || review.feedback;

  await review.save();

  return res
    .status(200)
    .json({ message: "Review updated successfully", review });
};

exports.deleteReview = async (req, res, next) => {
  const userId = req.userId;
  const reviewId = req.params.reviewId;

  const review = await Review.findById(reviewId);

  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  if (review.user.toString() !== userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await Review.deleteOne({ _id: reviewId });

  const restaurant = await Restaurant.findById(review.restaurant);
  restaurant.reviews = restaurant.reviews.filter(
    (r) => r.toString() !== reviewId
  );

  await restaurant.save();

  return res.status(200).json({ message: "Review deleted successfully" });
};

exports.getUserReviews = async (req, res, next) => {
  const userId = req.userId;

  const userReviews = await Review.find({ user: userId }).populate(
    "restaurant"
  );

  return res
    .status(200)
    .json({ message: "User reviews retrieved successfully", userReviews });
};
