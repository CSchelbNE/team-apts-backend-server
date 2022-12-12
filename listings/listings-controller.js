import * as dao from "./listing-dao.js";

export const ListingsController = (app) => {
    app.post("/listings/create", createListing);
    app.get("/listings/find-all/:id", findListingsById);
    app.get("/listings/:id", getListingByMongoId)
}

const createListing = async (req, res) => {
    const newListing = req.body;
    const returnedValue = await dao.pushListingToDB(newListing);
    return res.json(returnedValue)
}

const findListingsById = async (req, res) => {
    const listingId = parseInt(req.params.id);
    const listings = await dao.pullAllListingByID(listingId);
    return res.json(listings);
}

const getListingByMongoId = async (req, res) => {
    const id = req.params.id;
    const listing = await dao.getListingByMongoID(id);
    return res.json(listing);
}



const getRandomListings = async (req, res) => {

}


