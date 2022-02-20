import {Request, Response} from "express";

export default interface MessageControllerI {

    userMessagesUser(req: Request, res: Response): void;

    findAllMessagesUserSent(req: Request, res: Response): void;

    findAllMessagesUserReceived(req: Request, res: Response): void;

    deleteMessage(req: Request, res: Response): void;

    updateMessage(req: Request, res: Response): void;

    findAllMessagesByUser(req: Request, res: Response): void;
};