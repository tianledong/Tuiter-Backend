/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
import BookmarkControllerI from "../interfaces/BookmarkControllerI";
import {Express, Request, Response} from "express";
import BookmarkDao from "../daos/BookmarkDao";

/**
 * @class BookmarkController Implements RESTful Web service API for bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/bookmarks to retrieve all bookmarks
 *     </li>
 *     <li>GET /api/tuits/:tid/bookmarks to retrieve all users that bookmarked a tuit
 *     </li>
 *     <li>GET /api/users/:uid/bookmarks to retrieve all tuits that bookmarked by a user
 *     </li>
 *     <li>POST /api/users/:uid/bookmarks/:tid tp record a user bookmarks a tuit
 *     </li>
 *     <li> DELETE /api/users/:uid/bookmarks/:tid to record that a user no longer bookmarks a tuit</li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmark CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return BookmarkController
     */
    public static getInstance = (app: Express): BookmarkController => {
        if (BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.get("/api/bookmarks", BookmarkController.bookmarkController.findAllBookMarks);
            app.get("/api/tuits/:tid/bookmarks", BookmarkController.bookmarkController.findAllUserBookmarkedTuit);
            app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.findAllTuitsBookmarkedByUser);
            app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userUnbookmarksTuit);
        }
        return BookmarkController.bookmarkController;
    }

    private constructor() {
    }

    /**
     * Retrieves all bookmarks from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the bookmarks objects
     */
    findAllBookMarks = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllBookMarks()
            .then(bookmarks => res.json(bookmarks));

    /**
     * Retrieves all users that bookmarked a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the bookmarked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects that all bookmarked a tuit
     */
    findAllUserBookmarkedTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllUserBookmarkedTuit(req.params.tid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * Retrieves all tuits that bookmarked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user bookmarked the tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that bookmarked by a user
     */
    findAllTuitsBookmarkedByUser = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * Records a user that bookmarks a tuit to the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the bookmarks tuit and uid representing the user who
     * bookmarks the tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the bookmark that was inserted in the database
     */
    userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then(status => res.json(status));

    /**
     * Records a user that no longer bookmarks a tuit to the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the bookmarked tuit and uid representing the user who
     * bookmarked the tuit
     * @param {Response} res Represents response to client, including status
     * on whether deleting the bookmark was successful or not
     */
    userUnbookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
            .then(status => res.json(status));
}