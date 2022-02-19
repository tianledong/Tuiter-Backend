/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDao from "../daos/FollowDao";

/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/follows to retrieve all follows
 *     </li>
 *     <li>GET /api/users/:uid/follows to retrieve all users that followed by a user
 *     </li>
 *     <li>GET /api/users/:uid/followers to retrieve all users that following a user
 *     </li>
 *     <li>POST /api/users/:uid/follows/:uid1 to record that a user follows a user
 *     </li>
 *     <li>DELETE /api/users/:uid/unfollows/:uid1 to record that a user no longer follows
 *     a user
 *     </li>
 *     <li>PUT /api/follows/:fid to record that updates of follow
 *     </li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing likes CRUD operations
 * @property {followController} FollowController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.get("/api/follows", FollowController.followController.findAllFollows);
            app.get("/api/users/:uid/follows", FollowController.followController.findAllUsersFollowedByUser);
            app.get("/api/users/:uid/followers", FollowController.followController.findAllUsersThatFollowingUser);
            app.post("/api/users/:uid/follows/:uid1", FollowController.followController.userFollowsUser);
            app.delete("/api/users/:uid/follows/:uid1", FollowController.followController.userUnfollowsUser);
            app.put("/api/follows/:fid", FollowController.followController.updateFollow);
        }
        return FollowController.followController;
    }

    private constructor() {
    }

    /**
     * Retrieves all follows from the database
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follow objects
     */
    findAllFollows = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollows()
            .then(follows => res.json(follows));

    /**
     * Retrieves all users that followed by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the following user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects that followed by a user
     */
    findAllUsersFollowedByUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersFollowedByUser(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Retrieves all users that following a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the followed user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects that following a user
     */
    findAllUsersThatFollowingUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatFollowingUser(req.params.uid)
            .then(follows => res.json(follows))

    /**
     * Records that updating the follow object them from the database
     * @param {Request} req Represents request from client, including the path
     * parameter fid representing the follow object and body contains the new follow object
     * @param {Response} res Represents response to client, including the
     * status on whether updating the follow was successful or not
     */
    updateFollow = (req: Request, res: Response) =>
        FollowController.followDao.updateFollow(req.params.fid, req.body)
            .then(status => res.json(status))

    /**
     * Records that a user follows a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the followed user and uid1 representing the following user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the new follow objects
     */
    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsUser(req.params.uid, req.params.uid1)
            .then(follows => res.json(follows));

    /**
     * Records that a user no longer follows a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the followed user and uid1 representing the following user
     * @param {Response} res Represents response to client, including the
     * status on whether updating the follow was successful or not
     */
    userUnfollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsUser(req.params.uid, req.params.uid1)
            .then(follows => res.json(follows));
};