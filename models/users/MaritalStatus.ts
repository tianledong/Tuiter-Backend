/**
 * @file Declares MaritalStatus data type representing Marital Status of user
 */

/**
 * @typedef MaritalStatus Represents Marital Status of user
 * @readonly
 * @enum {string}
 */
enum MaritalStatus {
    /** @member {string} MARRIED
     * user is married
     */
    Married = 'MARRIED',
    /** @member {string} SINGLE
     * user is single
     */
    Single = 'SINGLE',
    /** @member {string} WIDOWED
     * user is widowed
     */
    Widowed = 'WIDOWED'
}
export default MaritalStatus;
