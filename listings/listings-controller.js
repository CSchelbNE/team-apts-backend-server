import {pullAllListingByID, pushListingToDB} from "./listing-dao.js";

export const ListingsController = (app) => {
    app.post("/listings/create", createListing);
    app.get("/listings/find-all/:id", findListingsById);
}

const createListing = async (req, res) => {
    const newListing = req.body;
    const returnedValue = await pushListingToDB(newListing);
    return res.json(returnedValue)
}

const findListingsById = async (req, res) => {
    const listingId = parseInt(req.params.id);
    const listings = await pullAllListingByID(listingId);
    return res.json(listings);
}

