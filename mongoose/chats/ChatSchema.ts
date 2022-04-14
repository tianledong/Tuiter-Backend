/**
 * @file Implements mongoose schema for chats
 */
import mongoose, {Schema} from "mongoose";

const ChatSchema = new mongoose.Schema({
    sentBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentTo: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date, default: Date.now},
    message: {type: String, required: true},
    isRead: {type: Boolean, default: false}
}, {collection: "chats"});
export default ChatSchema;
