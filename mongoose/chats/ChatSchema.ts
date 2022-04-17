/**
 * @file Implements mongoose schema for chats
 */
import mongoose, {Schema} from "mongoose";

/**
 * @typedef Chat Represents users chat users on Tuiter
 * @property {string} message text content of the chat
 * @property {ObjectId} sentTo the ID of the User who is the receiver of the chat message
 * @property {ObjectId} sentBy the ID of the User who is the sender of the chat message
 * @property {Date} sentOn the date of the message is sent
 * @property {Boolean} isRead a flag that indicates if the chat message is read by the receiver
 */
const ChatSchema = new mongoose.Schema({
    sentBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentTo: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date, default: Date.now},
    message: {type: String, required: true},
    isRead: {type: Boolean, default: false}
}, {collection: "chats"});
export default ChatSchema;
