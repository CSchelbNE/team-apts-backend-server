import shoppingCartModel from "./shopping-cart-model.js";
import mongoose from "mongoose";

export const getShoppingCartById = (id) => {
    return shoppingCartModel.findOne({owner: new mongoose.Types.ObjectId(id)})
}


export const createEmptyShoppingCart = (id) => {
    return shoppingCartModel.create({owner: new mongoose.Types.ObjectId(id)})
}


export const postToShoppingCart = async (listing, id) => {
    await shoppingCartModel.updateOne({owner: new mongoose.Types.ObjectId(id)}, {$push: {shopping_cart: listing}});
    return shoppingCartModel.findOne({owner: new mongoose.Types.ObjectId(id)})
}


// ID IS THE USER ID, ITEM TO DELETE IS THE LISTING ID
export const deleteFromShoppingCart = async (itemToDelete, id) => {
    const previousList = await shoppingCartModel.findOne({owner: new mongoose.Types.ObjectId(id)}).lean(true);
    console.log(previousList);
    const newValue = {owner: previousList.owner, shopping_cart :previousList.shopping_cart.filter(e => {
        return e._id.toString() !== itemToDelete
    })}
    await shoppingCartModel.updateOne({owner: new mongoose.Types.ObjectId(id)}, {$set: newValue});
    return shoppingCartModel.findOne({owner: new mongoose.Types.ObjectId(id)}).lean(true);
}

export const confirmTransaction = async (transaction) => {
    const ownerId = transaction.owner;
    // const deleteListing = async (listing) => {
    //     await listingModel.findByIdAndDelete(new mongoose.Types.ObjectId(listing._id));
    // }
    // await transaction.shopping_cart.forEach(listing => {
    //     if(listing.scheduled_for_delete){
    //         deleteListing(listing);
    //     }
    // });
    const result = await shoppingCartModel.deleteOne({_id: new mongoose.Types.ObjectId(transaction._id)})
    return await createEmptyShoppingCart(ownerId);
}