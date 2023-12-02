const {param} = require("express-validator");

const bnbParamIdValidator = [
    param('id')
        .notEmpty()
        .isMongoId(),
];

module.exports = {bnbParamIdValidator}