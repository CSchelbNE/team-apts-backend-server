import reviewModel from "./review-model.js";
import mongoose from "mongoose";
import userModel from "../users/users-model.js";

export const createReview = async (review) => {
    const result = await reviewModel.create(review);
    return reviewModel.findById(result._id).populate(["user","listing"]);
}

export const deleteReview = async (id) => {
    return reviewModel.findByIdAndDelete(id).populate(["user","listing"]);
}

export const editReview = async (id) => {
    return reviewModel.updateOne
}

export const getAllReviewsByUsername = async (username) => {
    const result = await userModel.findOne({username: username}).lean(true);
    return reviewModel.find({user: result._id}).populate(["user", "listing"]);
}

export const getAllReviewsByAlbum = (albumId) => {
    return reviewModel.find({listing: new mongoose.Types.ObjectId(albumId)}).populate(["user","listing"]);
}
