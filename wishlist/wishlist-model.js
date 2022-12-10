import mongoose from "mongoose"
import wishlistSchema from "./wishlist-schema.js";
const wishlistModel = mongoose.model('WishlistModel', wishlistSchema)
export default wishlistModel;
