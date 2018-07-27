import IValidator from "./IValidator"


class LoginValidator implements IValidator {
    /**
     * Validation rules for login
     * @param req 
     */
    validate(req: any): Array<object> {
        req.check('email')
           .isEmail().withMessage('Email field is not valid.');

        req.check('password')
           .notEmpty().withMessage('Password field is not valid.');

        return req.validationErrors();
    }
}

export default LoginValidator;