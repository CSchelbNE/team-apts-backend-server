import mongoose from "mongoose";

const shoppingCartSchema = mongoose.Schema({
      owner: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
          unique: true
      },
    quantity: Number,
    shopping_cart : {type: Array, default: []}
  }, {collection: "shopping-carts"})
export default shoppingCartSchema;
