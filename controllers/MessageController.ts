/**
 * @file Controller RESTful Web service API for messages resource
 */
import {Express, Request, Response} from "express";
import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/messages to retrieve all messages for a user
 *     </li>
 *     <li>GET /api/users/:uid/messages/sent to retrieve all messages sent by a user
 *     </li>
 *     <li>GET /api/users/:uid/messages/received to retrieve all messages a user received
 *     </li>
 *     <li>DELETE /api/messages/:mid to delete a message
 *     </li>
 *     <li>PUT /api/messages/:mid to update a message
 *     </li>
 *     <li>POST /api/users/:uid/messages/:uid1 to record that a user sends message to a user
 *     </li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing likes CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */

export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.get("/api/users/:uid/messages", MessageController.messageController.findAllMessagesByUser);
            app.get("/api/users/:uid/messages/sent", MessageController.messageController.findAllMessagesUserSent);
            app.get("/api/users/:uid/messages/received", MessageController.messageController.findAllMessagesUserReceived);
            app.delete("/api/messages/:mid", MessageController.messageController.deleteMessage);
            app.put("/api/messages/:mid", MessageController.messageController.updateMessage);
            app.post("/api/users/:uid/messages/:uid1", MessageController.messageController.userMessagesUser)
        }
        return MessageController.messageController;
    }

    /**
     * Retrieves all messages for a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllMessagesByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesByUser(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Retrieves all messages for a user received from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllMessagesUserReceived = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesUserReceived(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Retrieves all messages for a user sent from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllMessagesUserSent = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesUserSent(req.params.uid)
            .then(messages => res.json(messages));
    /**
     * Records that updates a messages to the database
     * @param {Request} req Represents request from client, including the path
     * parameter mid representing the message and body contains the new message object
     * @param {Response} res Represents response to client, including the
     * status on whether updating the message was successful or not
     */
    updateMessage = (req: Request, res: Response) =>
        MessageController.messageDao.updateMessage(req.params.mid, req.body)
            .then(status => res.json(status));

    /**
     * Records that deletes a messages to the database
     * @param {Request} req Represents request from client, including the path
     * parameter mid representing the message
     * @param {Response} res Represents response to client, including the
     * status on whether deleting the message was successful or not
     */
    deleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteMessage(req.params.mid)
            .then(status => res.json(status));

    /**
     * Records that a user sends a messages to another user to the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing a user, uid1 representing another user
     * and body contains the message string
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON object containing the message object
     */
    userMessagesUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessagesUser(req.params.uid, req.params.uid1, req.body)
            .then(messages => res.json(messages));
}



