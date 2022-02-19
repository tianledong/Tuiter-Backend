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
        followModel.find()
            .populate("userFollowed")
            .populate("userFollowing")
            .exec();

    findAllUsersFollowedByUser = async (uid: string): Promise<Follow[]> =>
        followModel.find({userFollowed: uid}).populate("userFollowing").exec();


    findAllUsersThatFollowingUser = async (uid: string): Promise<Follow[]> =>
        followModel.find({userFollowing: uid}).populate("userFollowed").exec();

    updateFollow = async (fid: string, follow: Follow): Promise<any> =>
        followModel.updateOne({_id: fid}, {$set: follow});

    userFollowsUser = async (uid: string, uid1: string): Promise<any> =>
        followModel.create({userFollowing: uid1, userFollowed: uid});

    userUnfollowsUser = async (uid: string, uid1: string): Promise<any> =>
        followModel.deleteOne({userFollowing: uid1, userFollowed: uid});
}