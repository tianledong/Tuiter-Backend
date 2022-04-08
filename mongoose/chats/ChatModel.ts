import mongoose from "mongoose";
import ChatSchema from "./ChatSchema";
const ChatModel = mongoose.model("ChatModel", ChatSchema);
export default ChatModel;