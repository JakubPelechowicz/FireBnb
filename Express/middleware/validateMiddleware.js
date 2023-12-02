const {validationResult} = require("express-validator");
const validate = validations => {
    return async (req, res, next) => {
        for (let validation of validations) {
            await validation.run(req);
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(422).json({errors: errors.array()});
    };
};

module.exports = {validate};