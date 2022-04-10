import {Request, Response} from "express";

/**
 * @file Declares API for Messages related Controller
 */
export default interface ChatControllerI {

    userChatsUser(req: Request, res: Response): void;

    findAllChatsUserSent(req: Request, res: Response): void;

    findAllChatsUserReceived(req: Request, res: Response): void;

    deleteChat(req: Request, res: Response): void;

    updateChat(req: Request, res: Response): void;

    findAllChatsByUser(req: Request, res: Response): void;
};
