import listingModel from "./listing-model.js";
import mongoose from "mongoose";
import reviewModel from "../reviews/review-model.js";

export const pushListingToDB = (listing) => {
    return listingModel.create(listing);
}

export const getAllListingsById = (id) => {
    return listingModel.find({discogs_id: id}).populate("record_vendor");
}

export const getListingByMongoID = (id) => {
    return listingModel.findById(id).populate("record_vendor");
}

export const getMostRecentListings = async () => {
    return listingModel.find().sort({_id: -1}).limit(5);
}

export const deleteListing = async (id) => {
    await reviewModel.deleteMany({listing: new mongoose.Types.ObjectId(id)})
    return listingModel.findByIdAndDelete(id);
}


export const editListing = async (listing) => {
    const oid = new mongoose.Types.ObjectId(listing._id);
    const vOid = new mongoose.Types.ObjectId(listing.record_vendor);
    const newListing = {...listing, record_vendor: vOid, _id: oid}
    return listingModel.updateOne(
        {_id: newListing._id}, {$set: listing});
}