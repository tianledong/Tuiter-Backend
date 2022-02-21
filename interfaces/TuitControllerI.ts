import {Request, Response} from "express";


/**
 * @file Declares API for Tuits related Controller
 */
export default interface TuitControllerI {
    findAllTuits(req: Request, res: Response): void;

    findTuitById(req: Request, res: Response): void;

    findTuitsByUser(req: Request, res: Response): void;

    createTuit(req: Request, res: Response): void;

    updateTuit(req: Request, res: Response): void;

    deleteTuit(req: Request, res: Response): void;
}
