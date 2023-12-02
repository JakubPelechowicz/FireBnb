const {body} = require("express-validator");

const reservationUpdateValidator = [
    body('id')
        .notEmpty()
        .isInt(),
    body('start_date')
        .optional()
        .isDate(),
    body('end_date')
        .optional()
        .isDate(),

];
module.exports = {reservationUpdateValidator}