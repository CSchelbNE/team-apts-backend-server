import mongoose from "mongoose"
import listingSchema from "./listing-schema.js";
const listingModel = mongoose.model('Listing', listingSchema, "records")
export default listingModel;
