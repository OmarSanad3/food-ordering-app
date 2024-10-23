const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  cart: [
    {
      meal: { type: Schema.Types.ObjectId, ref: "Meal" },
      quantity: { type: Number },
    },
  ],
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });

  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    // this.cart.items[cartProductIndex].quantity++;

    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({ productId: product._id, quantity: 1 });
    // this.cart.items.push({productId: product._id, quantity: 1});
  }

  const updatedCart = { items: updatedCartItems };
  this.cart = updatedCart;

  return this.save();
};

module.exports = mongoose.model("User", userSchema);
