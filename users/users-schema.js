import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: String,
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    bio: String,
    location: String,
    dob: Date,
    dateJoined: Date,
    numOfReviews: Number,
    numOfWishlist: Number,
    requestToBeSeller: Boolean,
    bannerPic: String,
    profilePic: String,
    type: {type: String, default: "BUYER"}
}, {collection: "users"})
export default userSchema;