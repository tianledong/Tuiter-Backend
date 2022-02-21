import {Request, Response} from "express";

/**
 * @file Declares API for Bookmarks related Controller
 */
export default interface BookmarkControllerI {
    userBookmarksTuit(req: Request, res: Response): void;

    userUnbookmarksTuit(req: Request, res: Response): void;

    findAllBookMarks(req: Request, res: Response): void;

    findAllTuitsBookmarkedByUser(req: Request, res: Response): void;

    findAllUserBookmarkedTuit(req: Request, res: Response): void;

};