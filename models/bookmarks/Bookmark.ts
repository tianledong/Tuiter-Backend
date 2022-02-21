/**
 * @file Declares Bookmark data type representing bookmarks of tuits
 */
import User from "../users/User";
import Tuit from "../tuits/Tuit";

/**
 * @typedef Bookmark Represents bookmarks of tuits
 * @property {Tuit} bookmarkedTuit Bookmarked Tuit
 * @property {User} bookmarkedBy User who bookmarked Tuit
 */
export default interface Bookmark {
    bookmarkedTuit: Tuit,
    bookmarkedBy: User
}