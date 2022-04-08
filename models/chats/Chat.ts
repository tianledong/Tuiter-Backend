/**
 * @file Declares Chat data type representing relationship between
 * users and users, as in users send chat message to another user
 */
import User from "../users/User";

/**
 * @typedef Chat Represents dislikes relationship between a user and a tuit,
 * as in a user likes a tuit
 * @property {User} sentBy user who sent this chat message
 * @property {User} sentTo user who received this chat message
 * @property {Date} sentOn the timestamp of the chat message
 * @property {string} message the body content of the chat message
 */

export default interface Chat {
    sentBy: User,
    sentTo: User,
    sentOn: Date,
    message: string
};