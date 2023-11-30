const {body} = require("express-validator");
const User = require("../models/user");

const userUpdateValidation = [
    body('full_name')
        .isLength({max: 255}),
    body('email')
        .isEmail()
        .custom(async value => {
            const user = await User.findOne({where: {email: value}});
            if (user) {
                throw new Error('Email must be unique');
            }
            return true;
        }),
    body('password')
        .isLength({max:32,min:8})
];

module.exports = {
    userUpdateValidation
};