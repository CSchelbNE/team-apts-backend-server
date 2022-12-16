import mongoose from "mongoose";

const followingSchema = mongoose.Schema({
     followed_user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true
     },
     following_user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true
     }
}, {collection: "following"})

export default followingSchema;