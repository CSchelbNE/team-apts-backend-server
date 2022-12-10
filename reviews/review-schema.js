import mongoose from "mongoose";
import ListingSchema from "../listings/listing-schema.js";

const reviewSchema = mongoose.Schema({
    username: String,
    rating: Number,
    review_body: String,
    user_avatar: String,
    first_name: String,
    last_name: String,
    album_data: ListingSchema
}, {collection: "reviews"})

export default reviewSchema;


