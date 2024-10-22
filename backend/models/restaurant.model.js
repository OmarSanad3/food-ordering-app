const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  location: { type: String, required: true }, // Cairo, Port Said, etc.
  smallDescription: { type: String, required: true },
  cheapestMeal: {
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  meals: [{ type: Schema.Types.ObjectId, ref: "Meal" }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  tags: [{ type: String }],
  deleviryTime: { type: Number, required: true },
  offer: { type: String },
  topDish: {
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

// * ==================== Methods ==================== * //

restaurantSchema.methods.getRating = async () => {
  // rating: {
  //   count: { type: Number, required: true },
  //   starts: { type: Number, required: true },
  // },
};
