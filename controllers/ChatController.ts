/**
 * @file Controller RESTful Web service API for chats resource
 */
import {Express, Request, Response} from "express";
import ChatControllerI from "../interfaces/ChatControllerI";
import ChatDao from "../daos/ChatDao";

/**
 * @class ChatController Implements RESTful Web service API for chats resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/chats to retrieve all chats for a user
 *     </li>
 *     <li>GET /api/users/:uid/chats/sent to retrieve all chats sent by a user
 *     </li>
 *     <li>GET /api/users/:uid/chats/received to retrieve all chats a user received
 *     </li>
 *     <li>DELETE /api/chats/:cid to delete a chat
 *     </li>
 *     <li>PUT /api/chats/:cid to update a chat
 *     </li>
 *     <li>POST /api/users/:uid/chats/:uid1 to record that a user sends chat to a user
 *     </li>
 * </ul>
 * @property {ChatDao} chatDao Singleton DAO implementing likes CRUD operations
 * @property {ChatController} chatController Singleton controller implementing
 * RESTful Web service API
 */

export default class ChatController implements ChatControllerI {
    private static chatDao: ChatDao = ChatDao.getInstance();
    private static chatController: ChatController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return ChatController
     */
    public static getInstance = (app: Express): ChatController => {
        if (ChatController.chatController === null) {
            ChatController.chatController = new ChatController();
            app.get("/api/users/:uid/chats", ChatController.chatController.findAllChatsByUser);
            app.get("/api/users/:uid/chats/sent", ChatController.chatController.findAllChatsUserSent);
            app.get("/api/users/:uid/chats/received", ChatController.chatController.findAllChatsUserReceived);
            app.delete("/api/chats/:cid", ChatController.chatController.deleteChat);
            app.put("/api/chats/:cid", ChatController.chatController.updateChat);
            app.post("/api/users/:uid/chats/:uid1", ChatController.chatController.userChatsUser);
            app.get("/api/users/:uid/chats/:uid1", ChatController.chatController.findChatForUsers);
            app.put("/api/users/:uid/chats/:uid1", ChatController.chatController.updateRead);
            app.get("/api/chats/users/:uid/unread", ChatController.chatController.countTotalUnreadMessage);
            app.get("/api/users/:uid/chats/:uid1/unread", ChatController.chatController.countTotalUnreadMessageForUsers);
        }
        return ChatController.chatController;
    }

    /**
     * Retrieves all chats for a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the chat objects
     */
    findAllChatsByUser = (req: Request, res: Response) =>
        ChatController.chatDao.findAllChatsByUser(req.params.uid)
            .then(chats => res.json(chats));

    /**
     * Retrieves all chats for a user received from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the chat objects
     */
    findAllChatsUserReceived = (req: Request, res: Response) =>
        ChatController.chatDao.findAllChatsUserReceived(req.params.uid)
            .then(chats => res.json(chats));

    /**
     * Retrieves all chats for a user sent from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the chat objects
     */
    findAllChatsUserSent = (req: Request, res: Response) =>
        ChatController.chatDao.findAllChatsUserSent(req.params.uid)
            .then(chats => res.json(chats));
    /**
     * Records that updates a chats to the database
     * @param {Request} req Represents request from client, including the path
     * parameter cid representing the chat and body contains the new chat object
     * @param {Response} res Represents response to client, including the
     * status on whether updating the chat was successful or not
     */
    updateChat = (req: Request, res: Response) =>
        ChatController.chatDao.updateChat(req.params.cid, req.body)
            .then(status => res.json(status));

    /**
     * Records that deletes a chats to the database
     * @param {Request} req Represents request from client, including the path
     * parameter cid representing the chat
     * @param {Response} res Represents response to client, including the
     * status on whether deleting the chat was successful or not
     */
    deleteChat = (req: Request, res: Response) =>
        ChatController.chatDao.deleteChat(req.params.cid)
            .then(status => res.json(status));

    /**
     * Records that a user sends a chats to another user to the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing a user, uid1 representing another user
     * and body contains the chat string
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON object containing the chat object
     */
    userChatsUser = (req: Request, res: Response) => {
        let userId = req.params.uid === "me"
        // @ts-ignore
        && req.session['profile'] ?
            // @ts-ignore
            req.session['profile']._id :
            req.params.uid;
        if (userId === 'me') {
            res.sendStatus(404)
        } else {
            ChatController.chatDao.userChatsUser(userId, req.params.uid1, req.body)
                .then(chat => res.json(chat));
        }
    }

    findChatForUsers = (req: Request, res: Response) => {
        let userId = req.params.uid === "me"
        // @ts-ignore
        && req.session['profile'] ?
            // @ts-ignore
            req.session['profile']._id :
            req.params.uid;
        if (userId === 'me') {
            res.sendStatus(404)
        } else {
            ChatController.chatDao.findChatForUsers(userId, req.params.uid1)
                .then(chats => res.json(chats));
        }
    }

    countTotalUnreadMessage = (req: Request, res: Response) => {
        let userId = req.params.uid === "me"
        // @ts-ignore
        && req.session['profile'] ?
            // @ts-ignore
            req.session['profile']._id :
            req.params.uid;
        if (userId === 'me') {
            res.sendStatus(404)
        } else {
            ChatController.chatDao.countTotalUnreadMessage(userId)
                .then(count => res.json(count));
        }
    }

    countTotalUnreadMessageForUsers = (req: Request, res: Response) => {
        let userId = req.params.uid === "me"
        // @ts-ignore
        && req.session['profile'] ?
            // @ts-ignore
            req.session['profile']._id :
            req.params.uid;
        if (userId === 'me') {
            res.sendStatus(404)
        } else {
            ChatController.chatDao.countTotalUnreadMessageForUsers(userId, req.params.uid1)
                .then(count => res.json(count));
        }
    }

    updateRead = (req: Request, res: Response) => {
        let userId = req.params.uid === "me"
        // @ts-ignore
        && req.session['profile'] ?
            // @ts-ignore
            req.session['profile']._id :
            req.params.uid;
        if (userId === 'me') {
            res.sendStatus(404)
        } else {
            ChatController.chatDao.updateRead(userId, req.params.uid1)
                .then(count => res.json(count));
        }
    }
}
