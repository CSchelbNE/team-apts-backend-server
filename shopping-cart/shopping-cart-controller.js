import * as dao from "./shopping-cart-dao.js"
export const ShoppingCartController = (app) => {
    app.get("/cart/:id", getShoppingCartById);
    app.post("/cart/:id", postToShoppingCart);
    app.post("/cart/new/:id", createEmptyShoppingCart)
    app.delete("/cart/:id", deleteFromShoppingCart);
    app.post("/cart/confirm/:id", confirmTransaction);
}

export const getShoppingCartById = async (req, res) => {
    const id = req.params.id;
    const result = await dao.getShoppingCartById(id);
    return res.json(result);
}

export const createEmptyShoppingCart = async (req,res) => {
    const id = req.params.id;
    const result = await dao.createEmptyShoppingCart(id);
    return res.json(result);
}
export const postToShoppingCart = async (req, res) => {
    const id = req.params.id;
    const listing = req.body;
    const result = await dao.postToShoppingCart(listing,id);
    return res.json(result);
}

export const deleteFromShoppingCart = async (req, res) => {
    const id = req.params.id;
    const itemToDelete = req.query.delete.toString();
    const result = await dao.deleteFromShoppingCart(itemToDelete,id);
    return res.json(result);
}

export const confirmTransaction = async (req,res) => {
    const transaction = req.body;
    const result = await dao.confirmTransaction(transaction);
    return res.json(result);
}