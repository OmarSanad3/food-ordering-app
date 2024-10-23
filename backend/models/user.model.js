const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  cart: [
    {
      mealId: { type: Schema.Types.ObjectId, ref: "Meal" },
      quantity: { type: Number }
    },
  ],
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }]
});


userSchema.methods.addToCart = function (meal) {
  const cartMealIndex = this.cart.findIndex(m => {
    return m.mealId.toString() === meal._id.toString();
  });

  if (cartMealIndex >= 0) {
    this.cart[cartMealIndex].quantity++;
  } else {
    this.cart.push({ mealId: meal._id, quantity: 1 });
  }

  return this.save();
};

userSchema.methods.removeFromCart = async function(mealId) {
  const updatedCartItems = this.cart.filter(m => {
    return m.mealId.toString() !== mealId.toString();
  });

  if(this.cart.length == updatedCartItems.length) {
    return "This Meal Does not exist in the cart";
  }

  this.cart = updatedCartItems;
  await this.save();

  return "Removed Meal From The Cart Successfully";
}

userSchema.methods.clearCart = function() {
  this.cart = [];

  return this.save();
}

userSchema.methods.addorder = function (order) {
  this.cart = [];
  this.orders.push(order);

  return this.save();
}

module.exports = mongoose.model("User", userSchema);
