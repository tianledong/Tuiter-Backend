import FollowDaoI from "../interfaces/FollowDaoI";
import followModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";

export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {
    }

    findAllFollows = async (): Promise<Follow[]> =>
        followModel.find().exec();

    findAllUsersFollowedByUser = async (uid: string): Promise<Follow[]> =>
        followModel.find({userFollowed: uid}).populate("userFollowing").exec();


    findAllUsersThatFollowingUser = async (uid: string): Promise<Follow[]> =>
        followModel.find({userFollowing: uid}).populate("userFollowed").exec();

    userRemoveFollower = async (uid: string, uid1: string): Promise<any> =>
        followModel.deleteOne({userFollowing: uid, userFollowed: uid1});

    userFollowsUser = async (uid: string, uid1: string): Promise<any> =>
        followModel.create({userFollowing: uid1, userFollowed: uid});

    userUnfollowsUser = async (uid: string, uid1: string): Promise<any> =>
        followModel.deleteOne({userFollowing: uid1, userFollowed: uid});
}