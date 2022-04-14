/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>dislikes<li>
 *     <li>follows</li>
 *     <li>bookmarks</li>
 *     <li>messages</li>
 *     <li>authentication</li>
 *     <li>group</li>
 *     <li>session</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import express from 'express';
import UserController from "./controllers/UserController";
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import TuitController from "./controllers/TuitController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";
import LikeController from "./controllers/LikeController";
import AuthenticationController from "./controllers/AuthenticationController";
import SessionController from "./controllers/SessionController";
import GroupController from "./controllers/GroupController";
import DisikeController from "./controllers/DislikeController";
import ChatController from "./controllers/ChatController";
import { createServer } from "http";
import { Server } from "socket.io";

const dotenv = require("dotenv")
dotenv.config()

var cors = require('cors')
const session = require("express-session");

const app = express();
const httpServer = createServer(app);
app.use(bodyParser.json());

const frontEnd = process.env.FRONTEND;

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3000/', frontEnd]
}));

let sessionMiddleware = session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
        sameSite: process.env.ENV === "production" ? 'none' : 'lax',
        secure: process.env.ENV === "production" ? 'true' : 'auto',
    }
});

if (process.env.ENV === 'production') {
    app.set('trust proxy', 1) // trust first proxy
}

// build the connection string
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const HOST = "cluster0.eaymt.mongodb.net";
const DB_NAME = "cs5500-tuiter";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
// connect to the database
mongoose.connect(connectionString);

app.use(sessionMiddleware)
app.use(express.json())



const io = new Server(httpServer, {
    cors: {
        // @ts-ignore
        origin: ["http://localhost:3000", frontEnd],
        methods: ["GET", "POST"],
        credentials: true
    },
});

// @ts-ignore
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));

io.use((socket, next) => {
    // @ts-ignore
    const session = socket.request.session;
    if (session && session.authenticated === true) {
        // @ts-ignore
        socket.userID = session.profile._id;
        next();
    } else {
        next(new Error("unauthorized"));
    }
});

io.on("connection", (socket) => {
    // @ts-ignore
    socket.join(socket.userID);

    socket.on("private message", ({message, to}) => {
        // @ts-ignore
        socket.to(to).emit("receive_message", {
            message: message,
            // @ts-ignore
            from: socket.userID,
        });
    });

    socket.on("refresh float button", ({message}) => {
        // @ts-ignore
        io.to(socket.userID).emit("refresh_float_button", {
            message: message
        });
    });
    socket.on("disconnect", () => {
        // @ts-ignore
        console.log("User Disconnected", socket.userID);
    });
});

app.get('/', (req, res) =>
    res.send('This app is running!'));


// create RESTful Web service API
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const dislikeController = DisikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);
const chatController = ChatController.getInstance(app);
AuthenticationController(app);
SessionController(app);
GroupController(app);
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
httpServer.listen(process.env.PORT || PORT);
