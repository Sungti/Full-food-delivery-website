const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deliveryInfo = {
  street: String,
  locality: String,
  aptName: String,
  zip: String,
  phoneNo: Number,
  lat: Number,
  lng: Number,
};

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    formattedAddress: {
      type: String,
    },
    address: deliveryInfo,
    account: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
    cart: {
      items: [
        {
          _id: false,
          itemId: {
            type: Schema.Types.ObjectId,
            ref: "Item",
            required: true,
          },
          quantity: { type: Number, required: true },
        },
      ],
    },
  },
  { timestamps: true }
);

userSchema.methods.addToCart = function(item) {
  const cartItemIndex = this.cart.items.findIndex(cartItem => {
    return cartItem.itemId.toString() === item._id.toString();
  });

  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartItemIndex >= 0) {
    newQuantity = this.cart.items[cartItemIndex].quantity + 1;
    updatedCartItems[cartItemIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      itemId: item._id,
      quantity: newQuantity,
    });
  }

  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.reduceQuantity = function(itemId) {
  const cartItemIndex = this.cart.items.findIndex(cartItem => {
    return cartItem.itemId.toString() === itemId.toString();
  });

  if (cartItemIndex >= 0) {
    const item = this.cart.items[cartItemIndex];

    if (item.quantity > 1) {
      item.quantity -= 1;
      this.cart.items[cartItemIndex] = item;
    } else {
      this.cart.items.splice(cartItemIndex, 1);
    }

    this.cart.items = this.cart.items;
    return this.save();
  }

  return Promise.reject(new Error("Item not found in cart"));
};

userSchema.methods.removeFromCart = function(itemId) {
  const updatedCartItems = this.cart.items.filter(cartItem => {
    return cartItem.itemId.toString() !== itemId.toString();
  });

  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.clearCart = function() {
  this.cart.items = [];
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
