import followingModel from "./following-model.js";
import mongoose from "mongoose";

export const deleteFollower = async (id) => {
    const result = await followingModel.findByIdAndDelete(id);
    console.log(result);
    return result;
}

export const createFollower = async (ids) => {
    const newFollow = {
        followed_user: new mongoose.Types.ObjectId(ids.followed_user.toString()),
        following_user: new mongoose.Types.ObjectId(ids.following_user.toString())
    }
    const result = await followingModel.create(newFollow);
    return followingModel.findById(result._id).populate(["followed_user","following_user"]);
}


// Gets all the users following the current user
export const getAllFollowers = async (id) => {
    return followingModel.find({followed_user: new mongoose.Types.ObjectId(id)}).populate(["followed_user","following_user"]);
}

// Checks if the provided id is the user following another user, returns all the users the currentUser is following
export const getAllFollowed = async (id) => {
    return followingModel.find({following_user: new mongoose.Types.ObjectId(id)}).populate(["followed_user", "following_user"])
}