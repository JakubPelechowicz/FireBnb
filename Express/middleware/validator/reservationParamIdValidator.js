const {param} = require("express-validator");

const reservationParamIdValidator = [
    param('id')
        .notEmpty()
        .isInt(),
];

module.exports = {reservationParamIdValidator}