import { findByCredentials, findByUsername } from './users-dao.js';
import * as dao from "./users-dao.js"

let currentUser = null
const UserController = async (app) => {

    const createUser = async (req, res) => {
        const user = req.body;
        console.log(user);
        const actualUser = await dao.createUser(user);
        res.json(actualUser);
    }

    const findAllUsers = async (req , res) => {
        const users = await dao.findAllUsers()
        res.json(users);
    }

    const deleteUser = async (req, res) => {
        const uid = req.params.uid;
        const status = await dao.deleteUser(uid);
        res.json(status);
    }
    const updateUser = async(req, res) => {
        const uid = req.params.uid;
        const updates = req.body;
        const status = await dao.updateUser(uid, updates);
        res.json(status);
    }
    const register = async (req, res) => {
        const user = req.body;
        const exisitingUser = await findByUsername(user.username);
        if (exisitingUser) {
            res.sendStatus(403);
            return
        }
        currentUser = await dao.createUser(user)
        req.session['currentUser'] = currentUser
        res.json(currentUser)
    }

    const login = async (req, res) => {
        const credentials = req.body;
        const exisitingUser = await dao.findByCredentials(credentials.username, credentials.password)
        if (exisitingUser) {
            req.session["currentUser"] = exisitingUser;
            currentUser = exisitingUser
            res.json(exisitingUser);
            return
        }
        res.sendStatus(403);
    }

    const profile = async (req, res) => {
        if (currentUser) {
            res.json(currentUser)
            return;
        }
        res.sendStatus(403);
    }

    const findUserByUsername = async (req, res) =>{
        const username = req.params.username;
        const user = await dao.findByUsername(username)
        if (user) {
            res.json(user);
            return;
        }
        res.sendStatus(403)
    }

    const logout = (req, res) => {
        currentUser = null
        res.sendStatus(200)
    };

    const getUsersRequestingVendorApprovals = async (req, res) => {
        const result = await dao.getUsersRequestingVendorApprovals();
        res.json(result);
    }

    const closeApproval = async (req, res) => {
        const decision = req.query.decision;
        const username = req.query.username;
        const result = await dao.closeApproval(username, decision);
        res.json(result);
    }



    app.post("/users", createUser);
    app.get('/users', findAllUsers);
    app.delete('/users/:uid', deleteUser);
    app.put('/users/:uid', updateUser);
    // "http://localhost:2000/users/:uid"
    app.get("/users/approvals", getUsersRequestingVendorApprovals)
    app.put("/users/approvals/close", closeApproval)
    app.post('/register', register)
    app.post('/login', login)
    app.get("/api/profile", profile)
    app.get("/api/profile/:username", findUserByUsername)
    app.post("/logout", logout)

}

export default UserController;