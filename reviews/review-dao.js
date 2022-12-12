import reviewModel from "./review-model.js";
import mongoose from "mongoose";

export const createReview = async (review) => {
    const result = await reviewModel.create(review);
    return reviewModel.findById(result._id).populate(["user","listing"]);
}

export const getAllReviewsByUsername = (username) => {
    return reviewModel.find({"user.username": username}).populate("user", "listing");
}

export const getAllReviewsByAlbum = (albumId) => {
    return reviewModel.find({listing: mongoose.Types.ObjectId(albumId)}).populate(["user","listing"]);
}
