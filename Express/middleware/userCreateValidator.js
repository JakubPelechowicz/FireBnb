const {body} = require("express-validator");
const User = require("../models/user");

const userCreateValidation = [
    body('full_name')
        .notEmpty()
        .isLength({max: 255}),
    body('email')
        .notEmpty()
        .isEmail()
        .custom(async value => {
            const user = await User.findOne({where: {email: value}});
            if (user) {
                throw new Error('Email must be unique');
            }
            return true;
        }),
    body('password')
        .notEmpty()
        .isLength({max:32,min:8})
];

module.exports = {
    userCreateValidation
};