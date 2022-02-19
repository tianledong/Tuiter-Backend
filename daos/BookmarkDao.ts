import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import Bookmark from "../models/bookmarks/Bookmark";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";

export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {
    }

    findAllTuitsBookmarkedByUsr = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({bookmarkedBy: uid})
            .populate("bookmarkedTuit")
            .exec();
    findAllBookMarks = async (): Promise<Bookmark[]> =>
        BookmarkModel.find()
            .populate("bookmarkedTuit")
            .populate("bookmarkedBy")
            .exec();
    findAllUserBookmarkedTuit = async (tid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({bookmarkedTuit: tid})
            .populate("bookmarkedBy")
            .exec()
    userBookmarksTuit = async (uid: string, tid: string): Promise<Bookmark> =>
        BookmarkModel.create({bookmarkedBy: uid, bookmarkedTuit: tid})


    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedBy: uid, bookmarkedTuit: tid});
}
