const mongoose = require("mongoose");

const wishlistSchema = mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    wishlist_items: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        rating: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
  },
  { timestamps: true }
);

const Wishlist = mongoose.model('Wishlist', wishlistSchema)

module.exports = Wishlist