/**
 * @file Declares Follows data type representing follow relationship between users in Tuiter
 */
import User from "../users/User";

/**
 * @typedef Follow Represents follow relationship between users in Tuiter
 * @property {User} userFollowed User who follows another user
 * @property {User} userFollowing User who is followed by another user
 */
export default interface Follow {
    userFollowed: User,
    userFollowing: User
}