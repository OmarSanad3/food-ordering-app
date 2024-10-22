const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  stars: { type: Number, required: true },
  feedback: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", reviewSchema);

// * ==================== Methods ==================== * //
