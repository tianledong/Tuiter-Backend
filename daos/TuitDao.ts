/**
 * @file Implements DAO managing data storage of tuitw. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import TuitDaoI from "../interfaces/TuitDaoI";
import TuitModel from "../mongoose/tuits/TuitModel";
import Tuit from "../models/tuits/Tuit";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuuits
 * @property {TuitDao} TuitDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns TuitDao
     */
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    private constructor() {
    }

    /**
     * Uses TuitModel to retrieve all tuit documents from tuits collection
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find();
    /**
     * Uses TuitModel to retrieve all tuit documents of a user from tuits collection
     * @param {string} uid User's Primary key
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({postedBy: uid});

    /**
     * Uses TuitModel to retrieve single user document from tuits collection
     * @param {string} tid Tuit's Primary key
     * @returns Promise To be notified when the tuit are retrieved from
     * database
     */
    findTuitById = async (tid: string): Promise<any> =>
        TuitModel.findById(tid)
            .populate("postedBy")
            .exec();

    /**
     * Inserts tuit instance for a user into the database
     * @param {string} uid User's Primary key
     * @param {Tuit} tuit Tuit Instance to be inserted into the database
     * @returns Promise To be notified when tuit is inserted in the database
     */
    createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        TuitModel.create({...tuit, postedBy: uid});

    /**
     * Updates tuit with new values in database
     * @param {string} tid Tuit's Primary key
     * @param {Tuit} tuit Tuit Instance containing properties and their new values
     * @returns Promise To be notified when tuit is updated in the database
     */
    updateTuit = async (tid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne(
            {_id: tid},
            {$set: tuit});

    /**
     * Removes tuit from the database
     * @param {string} tid Primary key of tuit to be removed
     * @returns Promise To be notified when tuit is removed from the database
     */
    deleteTuit = async (tid: string): Promise<any> =>
        TuitModel.deleteOne({_id: tid});

    /**
     * Inserts tuit instance into the database
     * @param {string} tuit Tuit Instance to be inserted into the database
     * @returns Promise To be notified when tuit is inserted into the database
     */
    createTuit = async (tuit: Tuit): Promise<Tuit> =>
        TuitModel.create({...tuit});
}