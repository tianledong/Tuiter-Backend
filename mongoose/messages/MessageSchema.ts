/**
 * @file Implements mongoose schema for messages
 */
import mongoose, {Schema} from "mongoose";

/**
 * @typedef Message Represents users message users on Tuiter
 * @property {string} message text content of the message
 * @property {ObjectId} to the ID of the User who is the receiver of the message
 * @property {ObjectId} from the ID of the User who is the sender of the message
 * @property {Date} sentOn the date of the message is sent
 */
const MessageSchema = new mongoose.Schema({
    message: {type: String, required: true},
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date, default: Date.now}
}, {collection: "messages"});
export default MessageSchema;
