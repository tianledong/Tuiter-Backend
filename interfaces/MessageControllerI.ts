import {Request, Response} from "express";

/**
 * @file Declares API for Messages related Controller
 */
export default interface MessageControllerI {

    /**
     * Records that a user sends a messages to another user to the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing a user, uid1 representing another user
     * and body contains the message string
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON object containing the message object
     */
    userMessagesUser(req: Request, res: Response): void;

    /**
     * Retrieves all messages for a user sent from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllMessagesUserSent(req: Request, res: Response): void;

    /**
     * Retrieves all messages for a user received from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllMessagesUserReceived(req: Request, res: Response): void;

    /**
     * Records that deletes a messages to the database
     * @param {Request} req Represents request from client, including the path
     * parameter mid representing the message
     * @param {Response} res Represents response to client, including the
     * status on whether deleting the message was successful or not
     */
    deleteMessage(req: Request, res: Response): void;

    /**
     * Records that updates a messages to the database
     * @param {Request} req Represents request from client, including the path
     * parameter mid representing the message and body contains the new message object
     * @param {Response} res Represents response to client, including the
     * status on whether updating the message was successful or not
     */
    updateMessage(req: Request, res: Response): void;

    /**
     * Retrieves all messages for a user sent from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllMessagesByUser(req: Request, res: Response): void;
};