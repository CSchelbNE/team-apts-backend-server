import mongoose from "mongoose"
import listingSchema from "./listing-schema.js";
const listingModel = mongoose.model('ListingModel', listingSchema)


export default listingModel;
