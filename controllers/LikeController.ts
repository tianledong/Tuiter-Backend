/**
 * @file Controller RESTful Web service API for likes resource
 */
import {Express, Request, Response} from "express";
import LikeDao from "../daos/LikeDao";
import LikeControllerI from "../interfaces/LikeControllerI";
import TuitDao from "../daos/TuitDao";

/**
 * @class LikeController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
 *     </li>
 *     <li>POST /api/users/:uid/likes/:tid to record that a user likes a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/unlikes/:tid to record that a user
 *     no longer likes a tuit
 *     </li>
 *     <li>Get /api/users/:uid/likes/:tid to retrieve that a user likes a tuit or not
 *     </li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {TuitDao} tuitDao Singleton DAO implementing tuits CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class LikeController implements LikeControllerI {
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static likeController: LikeController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return LikeController
     */
    public static getInstance = (app: Express): LikeController => {
        if(LikeController.likeController === null) {
            LikeController.likeController = new LikeController();
            app.get("/api/users/:uid/likes", LikeController.likeController.findAllTuitsLikedByUser);
            app.get("/api/tuits/:tid/likes", LikeController.likeController.findAllUsersThatLikedTuit);
            app.put("/api/users/:uid/likes/:tid", LikeController.likeController.userLikesTuit);
            app.delete("/api/users/:uid/unlikes/:tid", LikeController.likeController.userUnlikesTuit);
            app.get("/api/users/:uid/likes/:tid", LikeController.likeController.isUserlikesTuit);
        }
        return LikeController.likeController;
    }

    private constructor() {}

    /**
     * Retrieves all users that liked a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatLikedTuit = (req: Request, res: Response) =>
        LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));

    /**
     * Retrieves all tuits liked by a user from the database
     * @param {Request} req Represents request from client, including the pathfindAllTuitsLikedByUser
     * parameter uid representing the user liked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were liked
     */
    findAllTuitsLikedByUser = async (req: Request, res: Response) => {
        let userId = req.params.uid === "me"
        // @ts-ignore
        && req.session['profile'] ?
            // @ts-ignore
            req.session['profile']._id :
            req.params.uid;
        console.log("Try to find like");
        console.log(userId);
        if (userId === "me") {
            res.sendStatus(404);
        } else {
            try {
                let likes = await LikeController.likeDao.findAllTuitsLikedByUser(userId);
                const tuits = likes.map(likes => likes.tuit);
                res.json(tuits);
            } catch (e) {
                res.sendStatus(404);
            }
        }
    }

    /**
     * Retrieves if a tuit liked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user liked the tuits and tid for tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit was liked
     */
    isUserlikesTuit = async (req: Request, res: Response) => {
        let userId = req.params.uid === "me"
        // @ts-ignore
        && req.session['profile'] ?
            // @ts-ignore
            req.session['profile']._id :
            req.params.uid;
        if (userId === "me") {
            res.sendStatus(404);
        } else {
                let tuit = await LikeController.likeDao.isUserlikesTuit(userId, req.params.tid);
                if (tuit) {
                    const data = {'like' : true};
                    res.json(data);
                } else {
                    const data = {'like' : false};
                    res.json(data);
                }
        }
    }

    /**
     * Records that a user likes a tuit from the database
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new likes that was inserted in the
     * database
     */
    userLikesTuit = async (req: Request, res: Response) => {
        let userId = req.params.uid === "me"
        // @ts-ignore
        && req.session['profile'] ?
            // @ts-ignore
            req.session['profile']._id :
            req.params.uid;
        let tuitId = req.params.tid;

        if (userId === "me") {
            res.sendStatus(404)
        } else {
            const isLiked = await LikeController.likeDao.isUserlikesTuit(userId, tuitId);
            const targetTuit =  await LikeController.tuitDao.findTuitById(tuitId);
            let likeCount = await LikeController.likeDao.countLikesForTuit(tuitId);
            if (isLiked) {
                await LikeController.likeDao.userUnlikesTuit(userId, tuitId)
                    .then(status => res.send(status));
                targetTuit.stats.likes = likeCount - 1;
            } else {
                await LikeController.likeDao.userLikesTuit(userId, tuitId)
                    .then(likes => res.json(likes));
                targetTuit.stats.likes = likeCount + 1;
            }
            await LikeController.tuitDao.updateStats(tuitId, targetTuit.stats);
        }
    }
    /**
     * Records that a user no longer likes a tuit from the database
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unliking
     * the tuit and the tuit being unliked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the like was successful or not
     */
    userUnlikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao.userUnlikesTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));
};