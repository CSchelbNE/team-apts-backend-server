import mongoose from "mongoose"
import userSchema from "./users-schema.js"
const userModel = mongoose.model('User', userSchema, "users")
export default userModel;