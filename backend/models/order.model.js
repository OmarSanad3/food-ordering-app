const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  meals: [
    {
      meal: { type: Schema.Types.ObjectId, ref: "Meal", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, required: true },
  date: { type: Date, required: true },
});

const Order = mongoose.model("Order", orderSchema);

// * ==================== Methods ==================== * //
