import IValidator from "./IValidator"


class ResetPasswordValidator implements IValidator {
    /**
     * Validation rules for password reset
     * @param req 
     */
    validate(req: any): Array<object> {
        req.check('password')
            .isLength({min: 6}).withMessage('Password must contain at least 6 characters.');

        req.check('confirm')
           .equals(req.body.password).withMessage('Passwords do not match.');

        return req.validationErrors();
    }
}

export default ResetPasswordValidator;