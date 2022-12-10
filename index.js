import searchController from "./database/search-db.js";
import UserController from "./users/users-controller.js";
import express from 'express';
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session"
import {ListingsController} from "./listings/listings-controller.js";
import {ReviewController} from "./reviews/review-controller.js";
import {WishlistController} from "./wishlist/wishlist-controller.js";

const app = express();
app.use(express.json());
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false,
    maxPoolSize: 10,
    socketTimeoutMS:4500,
    family: 4
}
// DB_CONNECTION_STRING_APTS = mongodb+srv://APTS-final-project:supersecretpassword@cluster0.80l7cee.mongodb.net/APTS?retryWrites=true&w=majority
// put above in environment variables (see A9), then erase these comments, thanks!
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING_APTS || 'mongodb+srv://APTS-final-project:supersecretpassword@cluster0.80l7cee.mongodb.net/APTS?retryWrites=true&w=majority';
mongoose.connect(CONNECTION_STRING,mongooseOptions);
// DONT ADD THE EXTRA / TO THE END OF THE CORS ORIGINS
app.use(cors({
    credentials: true,
    origin: ["https://voluble-tanuki-375d22.netlify.app", "http://localhost:3000"]
}));
// app.use(cors({
//                  credentials: true,
//                  origin: "http://localhost:3000"
//              }))
// app.use((req, res, next) => {
//     const allowedOrigins = ["https://voluble-tanuki-375d22.netlify.app", "http://localhost:3000/"];
//     const origin = req.headers.origin;
//     if (allowedOrigins.includes(origin)) {
//         res.setHeader('Access-Control-Allow-Origin', origin);
//     }
//     //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
//     res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.header('Access-Control-Allow-Credentials', true);
//     return next();
// });
app.use(session({
    secret: "should be environment variable!",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))
searchController(app);
UserController(app);
ListingsController(app);
ReviewController(app);
WishlistController(app);
app.listen(process.env.PORT || 2000);
