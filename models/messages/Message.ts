/**
 * @file Declares Message data type representing users message users on Tuiter
 */
import User from "../users/User";

/**
 * @typedef Message Represents users message users on Tuiter
 * @property {string} message text content of the message
 * @property {User} to User who is the receiver of the message
 * @property {User} from  User who is the sender of the message
 * @property {Date} sentOn the date of the message is sent
 */
export default interface Message {
    message: string,
    to: User,
    from: User,
    sentOn: Date
}