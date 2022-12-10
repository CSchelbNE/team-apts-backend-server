import mongoose from "mongoose";

const wishlistSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    wishlist_records: {type: Array, "default": []}
}, {collection: "wishlists"})

export default wishlistSchema;