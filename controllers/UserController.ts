/**
 * @file Controller RESTful Web service API for users resource
 */
import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserControllerI";

/**
 * @class UserController Implements RESTful Web service API for users resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users to retrieve all users
 *     </li>
 *     <li>GET /api/users/:uid to retrieve a particular user instance
 *     </li>
 *     <li>POST /api/user to create a new user
 *     </li>
 *     <li>DELETE /api/users/:uid to delete a user
 *     <li>
 *     <li>PUT /api/users/:uid to update a user
 *     </li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing likes CRUD operations
 * @property {UserController} userController Singleton controller implementing
 * RESTful Web service API
 */
export default class UserController implements UserControllerI {
    private static userDao: UserDao = UserDao.getInstance();
    private static userController: UserController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return UserController
     */
    public static getInstance = (app: Express): UserController => {
        if (UserController.userController === null) {
            UserController.userController = new UserController();
            app.get('/api/users', UserController.userController.findAllUsers);
            app.get('/api/users/:uid', UserController.userController.findUserById);
            app.post('/api/users', UserController.userController.createUser);
            app.delete('/api/users/:uid', UserController.userController.deleteUser);
            app.put('/api/users/:uid', UserController.userController.updateUser);
        }
        return UserController.userController
    }

    private constructor() {
    }


    /**
     * Retrieves all users from the database
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the users objects
     */
    findAllUsers = (req: Request, res: Response) =>
        UserController.userDao.findAllUsers()
            .then(users => res.json(users));

    /**
     * Retrieves a particular user instance from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user that to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findUserById = (req: Request, res: Response) =>
        UserController.userDao.findUserById(req.params.uid)
            .then(user => res.json(user));

    /**
     * Records create a new user to the database
     * @param {Request} req Represents request from client, including the body
     * containing the JSON object for the new user to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the new user that was inserted in the database
     */
    createUser = (req: Request, res: Response) =>
        UserController.userDao.createUser(req.body)
            .then(user => res.json(user));

    /**
     * Records deleting a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user that will be deleted
     * @param {Response} res Represents response to client, including status
     * on whether deleting the user was successful or not
     */
    deleteUser = (req: Request, res: Response) =>
        UserController.userDao.deleteUser(req.params.uid)
            .then(status => res.json(status));

    /**
     * Records updating a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user that will be updated and the body
     * containing the JSON object for the new user
     * @param {Response} res Represents response to client, including status
     * on whether deleting the user was successful or not
     */
    updateUser = (req: Request, res: Response) =>
        UserController.userDao.updateUser(req.params.uid, req.body)
            .then(status => res.json(status));
}
