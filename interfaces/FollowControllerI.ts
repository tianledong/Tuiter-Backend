import {Request, Response} from "express";

/**
 * @file Declares API for Follows related Controller
 */
export default interface FollowControllerI {

    findAllUsersThatFollowingUser(req: Request, res: Response): void;

    findAllUsersFollowedByUser(req: Request, res: Response): void;

    userUnfollowsUser(req: Request, res: Response): void;

    userFollowsUser(req: Request, res: Response): void;

    findAllFollows(req: Request, res: Response): void;

    updateFollow(req: Request, res: Response): void;
};