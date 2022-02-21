/**
 * @file Declares Tuit data type representing tuits on Tuiter
 */
import User from "../users/User";

/**
 * @typedef Tuit Represents tuits
 * @property {string} tuit the string content of tuit
 * @property {Date} postedOn the date of the tuit is posted
 * @property {User} postedBy the User who posted the tuit
 */
export default class Tuit {
    private tuit: string = '';
    private postedOn: Date = new Date();
    private postedBy: User | null = null;
}
