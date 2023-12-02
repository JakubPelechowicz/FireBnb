const {query} = require("express-validator");

const reservationListValidator = [
    query('bnb_id')
        .notEmpty()
        .isMongoId(),
    query('start_date')
        .optional()
        .isDate(),
    query('end_date')
        .optional()
        .isDate(),
];
module.exports = {
    reservationListValidator
};