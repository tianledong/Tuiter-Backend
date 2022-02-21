/**
 * @file Implements mongoose schema for users
 */
import mongoose from "mongoose";

/**
 * @typedef User Represents users of Tuiter
 * @property {string} username User's username
 * @property {string} password User's password
 * @property {string} firstName User's first name
 * @property {string} lastName User's last name
 * @property {string} email User's email
 * @property {string} profilePhoto User's profile photo
 * @property {string} headerImage User's Header Image
 * @property {string} accountType User's account type from 'PERSONAL', 'ACADEMIC', 'PROFESSIONAL'
 * default is 'PERSONAL'
 * @property {string} maritalStatus User's Marital Status from 'MARRIED', 'SINGLE', 'WIDOWED'
 * default is 'SINGLE'
 * @property {string} biography User's biography
 * @property {Date} dateOfBirth User's Birth date
 * @property {Date} joined User's joined date
 * @property {Location} location User's location
 */
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    email: String,
    profilePhoto: String,
    headerImage: String,
    accountType: {type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL']},
    maritalStatus: {type: String, default: 'SINGLE', enum: ['MARRIED', 'SINGLE', 'WIDOWED']},
    biography: String,
    dateOfBirth: Date,
    joined: {type: Date, default: Date.now},
    location: {
        latitude: Number,
        longitude: Number
    }
}, {collection: 'users'});

export default UserSchema;