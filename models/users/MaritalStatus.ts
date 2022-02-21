/**
 * @file Declares MaritalStatus data type representing Marital Status of user
 */

/**
 * @typedef MaritalStatus Represents Marital Status of user
 * @readonly
 * @enum {string}
 */
enum MaritalStatus {
    /** @member {string}
     * user is married
     */
    Married = 'MARRIED',
    /** @member {string}
     * user is single
     */
    Single = 'SINGLE',
    /** @member {string}
     * user is widowed
     */
    Widowed = 'WIDOWED'
}
export default MaritalStatus;
