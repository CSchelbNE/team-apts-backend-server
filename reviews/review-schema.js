import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    rating: Number,
    body: {type: String, default: ""},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing',
        required: true
    }
}, {collection: "reviews"})

export default reviewSchema;


