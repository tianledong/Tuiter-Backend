/**
 * @file Controller RESTful Web service API for dislikes resource
 */

import DislikeControllerI from "../interfaces/DislikeControllerI";
import TuitDao from "../daos/TuitDao";
import {Express, Request, Response} from "express";
import DislikeDao from "../daos/DislikeDao";

/**
 * @class DislikeController Implements RESTful Web service API for likes resource.
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
 *     <li>Get /api/users/:uid/dislikes/:tid to retrieve that a user dislikes a tuit or not
 *     </li>
 * </ul>
 * @property {DislikeDao} dislikeDao Singleton DAO implementing disçlikes CRUD operations
 * @property {TuitDao} tuitDao Singleton DAO implementing tuits CRUD operations
 * @property {DislikeController} dislikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class DisikeController implements DislikeControllerI {
    private static dislikeDao: DislikeDao = DislikeDao.getInstance();
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static disikeController: DisikeController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return LikeController
     */
    public static getInstance = (app: Express): DisikeController => {
        if (DisikeController.disikeController === null) {
            DisikeController.disikeController = new DisikeController();
            app.get("/api/users/:uid/dislikes", DisikeController.disikeController.findAllTuitsDislikedByUser);
            app.get("/api/tuits/:tid/dislikes", DisikeController.disikeController.findAllUsersThatDislikedTuit);
            app.put("/api/users/:uid/dislikes/:tid", DisikeController.disikeController.userDislikesTuit);
            app.delete("/api/users/:uid/undislikes/:tid", DisikeController.disikeController.userUndislikesTuit);
            app.get("/api/users/:uid/dislikes/:tid", DisikeController.disikeController.isUserDislikesTuit);
        }
        return DisikeController.disikeController;
    }

    private constructor() {
    }

    /**
     * Retrieves all users that disliked a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the disliked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatDislikedTuit = (req: Request, res: Response) =>
        DisikeController.dislikeDao.findAllUsersThatDislikedTuit(req.params.tid)
            .then(likes => res.json(likes));

    /**
     * Retrieves all tuits disliked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user disliked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were disliked
     */
    findAllTuitsDislikedByUser = async (req: Request, res: Response) => {
        let userId = req.params.uid === "me"
        // @ts-ignore
        && req.session['profile'] ?
            // @ts-ignore
            req.session['profile']._id :
            req.params.uid;
        if (userId === "me") {
            res.sendStatus(404);
        } else {
            try {
                let dislikes = await DisikeController.dislikeDao.findAllTuitsDislikedByUser(userId);
                const tuits = dislikes.map(likes => likes.tuit);
                res.json(tuits);
            } catch (e) {
                res.sendStatus(404);
            }
        }
    }

    /**
     * Retrieves if a tuit disliked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user disliked the tuits and tid for tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit was disliked
     */
    isUserDislikesTuit = async (req: Request, res: Response) => {
        let userId = req.params.uid === "me"
        // @ts-ignore
        && req.session['profile'] ?
            // @ts-ignore
            req.session['profile']._id :
            req.params.uid;
        if (userId === "me") {
            res.sendStatus(404);
        } else {
            let tuit = await DisikeController.dislikeDao.isUserDislikesTuit(userId, req.params.tid);
            if (tuit) {
                const data = {'dislike': true};
                console.log(data);
                res.json(data);
            } else {
                const data = {'dislike': false};
                console.log(data);
                res.json(data);
            }
        }
    }

    /**
     * Records that a user dislikes a tuit from the database
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is disliking the tuit
     * and the tuit being disliked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new dislikes that was inserted in the
     * database
     */
    userDislikesTuit = async (req: Request, res: Response) => {
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
            const isDisliked = await DisikeController.dislikeDao.isUserDislikesTuit(userId, tuitId);
            const targetTuit = await DisikeController.tuitDao.findTuitById(tuitId);
            let dislikeCount = await DisikeController.dislikeDao.countDislikesForTuit(tuitId);
            if (isDisliked) {
                await DisikeController.dislikeDao.userUndislikesTuit(userId, tuitId)
                    .then(status => res.send(status));
                targetTuit.stats.dislikes = dislikeCount - 1;
            } else {
                await DisikeController.dislikeDao.userDislikesTuit(userId, tuitId)
                    .then(likes => res.json(likes));
                targetTuit.stats.dislikes = dislikeCount + 1;
            }
            await DisikeController.tuitDao.updateStats(tuitId, targetTuit.stats);
        }
    }
    /**
     * Records that a user no longer dislikes a tuit from the database
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unliking
     * the tuit and the tuit being unliked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the dislike was successful or not
     */
    userUndislikesTuit = (req: Request, res: Response) =>
        DisikeController.dislikeDao.userUndislikesTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));
};
