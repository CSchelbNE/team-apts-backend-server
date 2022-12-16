import mongoose from "mongoose"
import followingSchema from "./following-schema.js";
const followingModel = mongoose.model('Following', followingSchema, "following")

export default followingModel;
