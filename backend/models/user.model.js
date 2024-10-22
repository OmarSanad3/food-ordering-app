const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  cart: [
    {
      meal: { type: Schema.Types.ObjectId, ref: "Meal", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  orders: [{ type: Schema.Types.ObjectId, ref: "Order", required: true }],
});

userSchema.methods.addToCart = async function (mealId) {};

module.exports = mongoose.model("User", userSchema);

// * ==================== Methods ==================== * //
