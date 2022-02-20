/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import followModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Users
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {
    }

    /**
     * Uses FollowModel to retrieve all follow documents from follows collection
     * @returns Promise To be notified when the follows are retrieved from
     * database
     */
    findAllFollows = async (): Promise<Follow[]> =>
        followModel.find()
            .populate("userFollowed")
            .populate("userFollowing")
            .exec();

    /**
     * Uses FollowModel to retrieve all follow documents that followed by a user from follows collection
     * @param {string} uid Primary key of user
     * @returns Promise To be notified when the follows are retrieved from
     * database
     */
    findAllUsersFollowedByUser = async (uid: string): Promise<Follow[]> =>
        followModel.find({userFollowed: uid}).populate("userFollowing").exec();

    /**
     * Uses FollowModel to retrieve all follow documents that following a user from follows collection
     * @param {string} uid Primary key of user
     * @returns Promise To be notified when the follows are retrieved from
     * database
     */
    findAllUsersThatFollowingUser = async (uid: string): Promise<Follow[]> =>
        followModel.find({userFollowing: uid}).populate("userFollowed").exec();

    /**
     * Updates follow with new values in database
     * @param {string} fid Primary key of follow to be modified
     * @param {Follow} follow Follow object containing properties and their new values
     * @returns Promise To be notified when follow is updated in the database
     */
    updateFollow = async (fid: string, follow: Follow): Promise<any> =>
        followModel.updateOne({_id: fid}, {$set: follow});

    /**
     * Inserts follow instance into the database
     * @param {string} uid Primary key of user
     * @param {string} uid1 Primary key of another user who is going to be followed
     * @returns Promise To be notified when follow is inserted into the databas
     */
    userFollowsUser = async (uid: string, uid1: string): Promise<any> =>
        followModel.create({userFollowing: uid1, userFollowed: uid});

    /**
     * Removes follow from the database
     * @param {string} uid Primary key of user
     * @param {string} uid1 Primary key of another user who is going to be unfollowed
     * @returns Promise To be notified when follow is removed from the databas
     */
    userUnfollowsUser = async (uid: string, uid1: string): Promise<any> =>
        followModel.deleteOne({userFollowing: uid1, userFollowed: uid});
}