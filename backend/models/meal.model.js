const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mealSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
});

const Meal = mongoose.model("Meal", mealSchema);

// * ==================== Methods ==================== * //
