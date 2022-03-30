/**
 * @file Implements mongoose schema for dislikes
 */
import mongoose, {Schema} from "mongoose";
import Dislike from "../../models/dislikes/Dislike";

/**
 * @typedef Disike Represents users dislike tuits in Tuiter
 * @property {ObjectId} tuit the ID of Tuit that being disliked
 * @property {ObjectId} dislikedBy the ID of User who dislikes the Tuit
 */
const DislikeSchema = new mongoose.Schema<Dislike>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    dislikedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "dislikes"});
export default DislikeSchema;