import {Request, Response} from "express";

export default interface BookmarkControllerI {
    userBookmarksTuit(req: Request, res: Response): void;

    userUnbookmarksTuit(req: Request, res: Response): void;

    findAllBookMarks(req: Request, res: Response): void;

    findAllTuitsBookmarkedByUser(req: Request, res: Response): void;

    findAllUserBookmarkedTuit(req: Request, res: Response): void;

};