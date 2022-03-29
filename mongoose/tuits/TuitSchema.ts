/**
 * @file Implements mongoose schema for tuits
 */
import mongoose, {Schema} from "mongoose";

/**
 * @typedef Tuit Represents tuits
 * @property {string} tuit the string content of tuit
 * @property {Date} postedOn the date of the tuit is posted
 * @property {ObjectId} postedBy the ID of the User who posted the tuit
 */
const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true},
    postedOn: {type: Date, default: Date.now},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    image: String,
    youtube: String,
    avatarLogo: String,
    imageOverlay: String,
    stats: {
        replies: {type: Number, default: 0},
        retuits: {type: Number, default: 0},
        likes: {type: Number, default: 0},
        dislikes: {type: Number, default: 0}
    }
}, {collection: "tuits"});
export default TuitSchema;