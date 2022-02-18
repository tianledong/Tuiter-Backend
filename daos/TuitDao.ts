import TuitDaoI from "../interfaces/TuitDaoI";
import TuitModel from "../mongoose/tuits/TuitModel";
import Tuit from "../models/tuits/Tuit";

/**
 * Implements Data Access Object managing data storage
 * of Tuits
 * @implements {TuitDaoI} UserDaoI
 * @property {TuitDao} userDao Private single instance of UserDaoI
 */
export default class TuitDao implements TuitDaoI{
    private static tuitDao: TuitDao | null = null;
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() {}
    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find();
    findTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({postedBy: uid});
    findTuitById = async (uid: string): Promise<any> =>
        TuitModel.findById(uid)
            .populate("postedBy")
            .exec();
    createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        TuitModel.create({...tuit, postedBy: uid});
    updateTuit = async (uid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne(
            {_id: uid},
            {$set: tuit});
    deleteTuit = async (uid: string): Promise<any> =>
        TuitModel.deleteOne({_id: uid});

    createTuit = async (tuit:Tuit): Promise<Tuit> =>
        TuitModel.create({...tuit});
}