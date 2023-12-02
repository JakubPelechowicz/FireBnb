const {body} = require("express-validator");

const bnbUpdateValidator = [
    body('id')
        .notEmpty()
        .isMongoId(),
    body('space')
        .isInt(),
    body('cost')
        .isNumeric(),
    body('address')
        .isAlphanumeric()
        .isLength({max: 255})
];
module.exports = {bnbUpdateValidator};