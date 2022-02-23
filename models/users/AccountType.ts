/**
 * @file Declares AccountType data type representing Account Type of user
 */

/**
 * @typedef AccountType Represents Account Type of user
 * @readonly
 * @enum {string} AccountType
 */
enum AccountType {
    /** @member {string} PERSONAL
     * personal account
     */
    Personal = 'PERSONAL',
    /** @member {string} ACADEMIC
     * academic account
     */
    Academic = 'ACADEMIC',
    /** @member {string} PROFESSIONAL
     * professional account
     */
    Professional = 'PROFESSIONAL'
}
export default AccountType;
