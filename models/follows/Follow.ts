/**
 * @file Declares Bookmark data type representing bookmarks of tuits
 */
import User from "../users/User";

/**
 * @typedef Bookmark Represents follow relationship between users in Tuiter
 * @property {User} userFollowed User who follows another user
 * @property {User} userFollowing User who is followed by another user
 */
export default interface Follow {
    userFollowed: User,
    userFollowing: User
}