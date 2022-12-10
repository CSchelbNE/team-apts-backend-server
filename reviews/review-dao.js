import reviewModel from "./review-model.js";

export const pushReviewToDB = (review) => {
    return reviewModel.create(review);
}

export const getAllReviewsByUsername = (username) => {
    return reviewModel.find({username: username});
}

export const getAllReviewsByAlbum = (albumId) => {
    return reviewModel.find({'album_data.discogs_id': albumId})
}
