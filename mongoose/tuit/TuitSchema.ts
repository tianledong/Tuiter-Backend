import mongoose, {Schema} from "mongoose";
const UserSchema = new mongoose.Schema({
    tuit: {type: String, required: true},
    postedOn: {type: Date, default: Date.now},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"}
}, {collection: 'tuits'});
export default UserSchema;