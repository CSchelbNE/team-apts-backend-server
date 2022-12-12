import mongoose from "mongoose"
import listingSchema from "./listing-schema.js";
const listingModel = mongoose.model('Listing', listingSchema, "listings")
export default listingModel;
