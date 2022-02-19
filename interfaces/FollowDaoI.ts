import Follow from "../models/follows/Follow";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface FollowDaoI {
    findAllUsersThatFollowingUser(uid: string): Promise<Follow[]>;

    findAllUsersFollowedByUser(uid: string): Promise<Follow[]>;

    userUnfollowsUser(uid: string, uid1: string): Promise<any>;

    userFollowsUser(uid: string, uid1: string): Promise<Follow>;

    findAllFollows(): Promise<Follow[]>;

    userRemoveFollower(uid:string, uid1: string): Promise<any>;
};