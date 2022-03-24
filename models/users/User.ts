/**
 * @file Declares Tag data type representing users of Tuiter
 */

import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

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
// export default class User {
//     private username: string = '';
//     password: string = '';
//     private firstName: string | null = null;
//     private lastName: string | null = null;
//     private email: string = '';
//     private profilePhoto: string | null = null;
//     private headerImage: string | null = null;
//     private accountType: AccountType = AccountType.Personal;
//     private maritalStatus: MaritalStatus = MaritalStatus.Single;
//     private biography: string | null = null;
//     private dateOfBirth: Date | null = null;
//     private joined: Date = new Date();
//     private location: Location | null = null;
// }

export default interface User {
    username: string,   // required
    password: string,
    firstName?: string,
    lastName?: string,
    email: string,
    profilePhoto?: string,
    headerImage?: string,
    biography?: string,
    dateOfBirth?: Date,
    accountType?: AccountType,
    maritalStatus?: MaritalStatus,
    location?: Location,
};
