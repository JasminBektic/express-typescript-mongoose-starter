import IValidator from "./IValidator"


class RegisterValidator implements IValidator {
    /**
     * Validation rules for registration
     * @param req 
     */
    validate(req: any): Array<object> {
        req.check('email')
           .isEmail().withMessage('Email field is not valid.');

        req.check('password')
           .isLength({min: 6}).withMessage('Password must contain at least 6 characters.');

        req.check('password_confirmation')
           .equals(req.body.password).withMessage('Passwords do not match.');

        return req.validationErrors();
    }
}

export default RegisterValidator;