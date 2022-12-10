import userModel from "./users-model.js";

export const createUser = (user) => userModel.create(user);

export const findAllUsers = () => userModel.find();

export const findUsersById = (uid) => userModel.findById(uid);

export const findByUsername = (username) => userModel.findOne({username})

export const findByCredentials = (username, password) => userModel.findOne({username, password});

export const deleteUser = (uid) => userModel.deleteOne({username : uid});

export const getUsersRequestingVendorApprovals = () => userModel.find({requestToBeSeller: true, type: "BUYER"});

export const closeApproval = async (username, decision) => {
    if (decision === "APPROVE") {
        await userModel.updateOne({username: username}, {$set: {requestToBeSeller: false, type:"SELLER"}});
    } else {
        await userModel.updateOne({username: username}, {$set: {requestToBeSeller: false}});
    }
    return {username:username};
}

export const updateUser = async (uid, userUpdates) => {
    await userModel.updateOne({username: uid}, {$set: userUpdates})
    return userModel.findOne({username: userUpdates.username});
}
