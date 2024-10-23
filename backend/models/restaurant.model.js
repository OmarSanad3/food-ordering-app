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

// * ==================== Methods ==================== * //

restaurantSchema.methods.getRating = async function () {
  return {
    count: 10,
    stars: 4.5,
  };
};

restaurantSchema.methods.updateTags = async function (tags) {
  this.tags = tags;
  return await this.save();
};


// * ==================== exports ==================== * //

module.exports = mongoose.model("Restaurant", restaurantSchema);
