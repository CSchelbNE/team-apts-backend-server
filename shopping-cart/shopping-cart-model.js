import ShoppingCartSchema from "./shopping-cart-schema.js";
import mongoose from "mongoose";
const shoppingCartModel = mongoose.model('Cart', ShoppingCartSchema, "shopping-carts")
export default shoppingCartModel;
