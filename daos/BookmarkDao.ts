/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose bookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import Bookmark from "../models/bookmarks/Bookmark";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";


/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Users
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {
    }

    /**
     * Uses BookmarkModel to retrieve all bookmark documents that bookmarked by a user from bookmarks collection
     * @param {string} uid Primary key of user
     * @returns Promise To be notified when the bookmarks are retrieved from
     * database
     */
    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({bookmarkedBy: uid})
            .populate("bookmarkedTuit")
            .exec();

    /**
     * Uses BookmarkModel to retrieve all bookmarks documents from bookmarks collection
     * @returns Promise To be notified when the bookmarks are retrieved from
     * database
     */
    findAllBookMarks = async (): Promise<Bookmark[]> =>
        BookmarkModel.find()
            .populate("bookmarkedTuit")
            .populate("bookmarkedBy")
            .exec();

    /**
     * Uses BookmarkModel to retrieve all bookmark documents that bookmarked a tuit from bookmarks collection
     * @param {string} tid Primary key of tuit
     * @returns Promise To be notified when the bookmarks are retrieved from
     * database
     */
    findAllUserBookmarkedTuit = async (tid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({bookmarkedTuit: tid})
            .populate("bookmarkedBy")
            .exec()

    /**
     * Inserts bookmark instance into the database
     * @param {string} uid Primary key of user
     * @param {string} tid Primary key of tuit
     * @returns Promise To be notified when bookmark is inserted into the database
     */
    userBookmarksTuit = async (uid: string, tid: string): Promise<Bookmark> =>
        BookmarkModel.create({bookmarkedBy: uid, bookmarkedTuit: tid})


    /**
     * Removes bookmark instance from the database
     * @param {string} uid Primary key of user
     * @param {string} tid Primary key of tuit
     * @returns Promise To be notified when bookmark is removed from the database
     */
    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedBy: uid, bookmarkedTuit: tid});
}
