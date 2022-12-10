import * as dao from "./wishlist-dao.js";

export const WishlistController = (app) => {
    app.post("/wishlist/create/:username", createEmptyWishlist)
    app.post("/wishlist/add/:username", postToWishlist);
    app.get("/wishlist/get/:username", getWishlistByUsername);
    app.delete("/wishlist/delete", deleteItemFromWishlist);
}

const postToWishlist = async (req,res) => {
    const album = req.body;
    const username = req.params.username;
    const result = await dao.postToWishlist(album, username);
    res.json(result)
}

const createEmptyWishlist = async (req,res) => {
    const username = req.params.username;
    const result = await dao.createEmptyWishlist(username);
    res.json(result);
}

const getWishlistByUsername = async (req, res) => {
    const username = req.params.username;
    const result = await dao.getWishlistByUsername(username);
    res.json(result);
}

const deleteItemFromWishlist = async (req, res) => {
    const albumId = req.query.id;
    const username = req.query.username;
    const result = await dao.deleteItemFromWishlist(albumId, username);
    res.json(result);
}