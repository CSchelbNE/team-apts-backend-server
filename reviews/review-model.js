import mongoose from "mongoose"
import reviewSchema from "./review-schema.js";
const reviewModel = mongoose.model('Review', reviewSchema, "reviews")

export default reviewModel;
