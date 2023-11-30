const {body} = require("express-validator");
const Bnb = require("../models/bnb");

const bnbListValidator = [
    body('space_max')
        .isInt(),
    body('space_min')
        .isInt(),
    body('user_id')
        .isInt(),
    body('address_like')
        .isAlphanumeric()
        .isLength({max: 255}),
    body('min_cost')
        .isNumeric(),
    body('max_cost')
        .isNumeric()
];
module.exports = {
    bnbListValidator
};