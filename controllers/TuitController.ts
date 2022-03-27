/**
 * @file Controller RESTful Web service API for tuits resource
 */
import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitControllerI";

/**
 * @class TuitController Implements RESTful Web service API for tuits resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/tuits to retrieve all tuits
 *     </li>
 *     <li>GET /api/tuits/:tid to retrieve a particular tuit instance
 *     </li>
 *     <li>GET /api/users/:uid/tuits to retrieve all tuit of a user
 *     </li>
 *     <li>GET /api/tuits to create a tuit
 *     </li>
 *     <li>GET /api/users/:uid/tuits to create a tuit for a user
 *     </li>
 *     <li>DELETE /api/tuits/:tid to delete a tuit
 *     <li>
 *     <li>PUT /api/tuits/:tid to update a tuit
 *     </li>
 * </ul>
 * @property {TuitDao} tuitDao Singleton DAO implementing likes CRUD operations
 * @property {TuitController} tuitController Singleton controller implementing
 * RESTful Web service API
 */
export default class TuitController implements TuitControllerI {
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitController: TuitController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
     */
    public static getInstance = (app: Express): TuitController => {
        if (TuitController.tuitController === null) {
            TuitController.tuitController = new TuitController();
            app.get('/api/tuits', TuitController.tuitController.findAllTuits);
            app.get('/api/tuits/:tid', TuitController.tuitController.findTuitById);
            app.get('/api/users/:uid/tuits', TuitController.tuitController.findTuitsByUser);
            app.post('/api/tuits', TuitController.tuitController.createTuit);
            app.post('/api/users/:uid/tuits', TuitController.tuitController.createTuitByUser);
            app.delete('/api/tuits/:tid', TuitController.tuitController.deleteTuit);
            app.put('/api/tuits/:tid', TuitController.tuitController.updateTuit);

            // for testing
            app.get('/api/users/:uid/tuits/delete', TuitController.tuitController.deleteTuitsByUser);
        }
        return TuitController.tuitController;
    }

    constructor() {}

    /**
     * Retrieves all tuits from the database
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuits objects
     */
    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));

    /**
     * Retrieves a particular tuit instance from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the tuit that to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects
     */
    findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitById(req.params.tid)
            .then(tuit => res.json(tuit));

    /**
     * Records create a new tuit to the database
     * @param {Request} req Represents request from client, including the body
     * containing the JSON object for the new tuit to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the new tuit that was inserted in the database
     */
    createTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.createTuit(req.body)
            .then(tuit => res.json(tuit));

    /**
     * Records create a new tuit to the database for a user
     * @param {Request} req Represents request from client, including the body
     * containing the JSON object for the new tuit to be inserted in the
     * database and the path parameter uid representing the user who posts the tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the new tuit that was inserted in the database
     */
    createTuitByUser = (req: Request, res: Response) => {
        let userId = req.params.uid === "me"
        // @ts-ignore
        && req.session['profile'] ?
            // @ts-ignore
            req.session['profile']._id :
            req.params.uid;
        TuitController.tuitDao.createTuitByUser(userId, req.body)
            .then(tuit => res.json(tuit));
    }
    /**
     * Records deleting a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the tuit that will be deleted
     * @param {Response} res Represents response to client, including status
     * on whether deleting the tuit was successful or not
     */
    deleteTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.deleteTuit(req.params.tid)
            .then(status => res.json(status));

    /**
     * Records updating a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the tuit that will be updated and the body
     * containing the JSON object for the new tuit
     * @param {Response} res Represents response to client, including status
     * on whether deleting the tuit was successful or not
     */
    updateTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.updateTuit(req.params.tid, req.body)
            .then(status => res.json(status));

    /**
     * Retrieves all tuits from the database for a user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuits objects
     */
    findTuitsByUser = (req: Request, res: Response) => {
        let userId = req.params.uid === "me"
        // @ts-ignore
        && req.session['profile'] ?
            // @ts-ignore
            req.session['profile']._id :
            req.params.uid;
        try {
            TuitController.tuitDao.findTuitsByUser(userId)
                .then(tuits => res.json(tuits));
        } catch (e) {
            res.sendStatus(404)
        }
    }

    deleteTuitsByUser = (req: Request, res: Response) =>
        TuitController.tuitDao.deleteTuitsByUser(req.params.uid)
            .then(status => res.json(status));
}
