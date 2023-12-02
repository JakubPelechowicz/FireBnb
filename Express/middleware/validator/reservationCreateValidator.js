const {body} = require("express-validator");

const reservationCreateValidator = [
    body('bnb_id')
        .notEmpty()
        .isMongoId(),
    body('start_date')
        .notEmpty()
        .isDate(),
    body('end_date')
        .notEmpty()
        .isDate(),

];
module.exports = {reservationCreateValidator}