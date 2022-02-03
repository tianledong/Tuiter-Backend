import mongoose from "mongoose";
import TuitSchema from "./TuitSchema";
const TuitModel = mongoose.model('TuitSchema', TuitSchema);
export default TuitModel;