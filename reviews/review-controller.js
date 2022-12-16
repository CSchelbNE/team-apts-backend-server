import * as dao from "./review-dao.js";


export const ReviewController = (app) => {
    app.post("/review/create", createReview);
    app.get("/review/get-all/:username", getAllReviewsByUsername);
    app.get("/review/album/get-all/:id", getAllReviewsByAlbum);
    app.delete("/review/:id",deleteReivew)
}

export const createReview = async (req,res) => {
    const body = req.body;
    const result = await dao.createReview(body);
    res.json(result);
}

export const deleteReivew = async (req,res) => {
    const id = req.params.id;
    console.log(id);
    const result = await dao.deleteReview(id);
    res.json(result);
}

export const getAllReviewsByUsername = async (req,res) => {
    const username = req.params.username;
    const result = await dao.getAllReviewsByUsername(username)
    res.json(result);
}

export const getAllReviewsByAlbum = async (req,res) => {
    const albumId = req.params.id;
    const result = await dao.getAllReviewsByAlbum(albumId);
    res.json(result);
}

