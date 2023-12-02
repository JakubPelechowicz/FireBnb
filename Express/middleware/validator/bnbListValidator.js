const {query} = require("express-validator");

const bnbListValidator = [
    query('space_max')
        .optional()
        .isInt(),
    query('space_min')
        .optional()
        .isInt(),
    query('user_id')
        .optional()
        .isInt(),
    query('address_like')
        .optional()
        .isAlphanumeric()
        .isLength({max: 255}),
    query('min_cost')
        .optional()
        .isNumeric(),
    query('max_cost')
        .optional()
        .isNumeric()
];
module.exports = {
    bnbListValidator
};