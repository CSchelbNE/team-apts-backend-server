import listingModel from "./listing-model.js";

export const pushListingToDB = (listing) => {
    return listingModel.create(listing);
}

export const pullAllListingByID = (id) => {
    return listingModel.find({discogs_id: id});
}

export const getListingByMongoID = (id) => {
    return listingModel.findById(id);
}
