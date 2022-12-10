import wishlistModel from "./wishlist-model.js";


export const postToWishlist = async (album, username) => {
    await wishlistModel.updateOne({username: username}, {$push: {wishlist_records: album}});
    return wishlistModel.findOne({username: username});

}

export const createEmptyWishlist = async (username) => {
    const res = await wishlistModel.findOne({username: username}).lean(true);
    if (!res) {
        return await wishlistModel.create({username: username});
    } else return {username: "DUPLICATE USERNAME: ERROR", wishlist_records: "DUPLICATE KEY: ERROR"}
}

export const getWishlistByUsername = (username) => {
    return wishlistModel.findOne({username: username});
}

export const deleteItemFromWishlist = async (albumId, username) => {
    const previousList = await wishlistModel.findOne({username: username});
    const result = {username: previousList.username, wishlist_records: previousList.wishlist_records.filter(e => e.discogs_id !== parseInt(albumId))};
    await wishlistModel.updateOne({username: username}, {$set: result});
    return result;
}