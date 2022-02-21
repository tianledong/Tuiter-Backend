/**
 * @file Declares AccountType data type representing Account Type of user
 */

/**
 * @typedef AccountType Represents Account Type of user
 * @readonly
 * @enum {string}
 */
enum AccountType {
    /** @member {string}
     * personal account
     */
    Personal = 'PERSONAL',
    /** @member {string}
     * academic account
     */
    Academic = 'ACADEMIC',
    /** @member {string}
     * professional account
     */
    Professional = 'PROFESSIONAL'
}
export default AccountType;
