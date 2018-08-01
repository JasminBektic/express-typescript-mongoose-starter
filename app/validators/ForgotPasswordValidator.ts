import IValidator from "./IValidator"


class ForgotPasswordValidator implements IValidator {
    /**
     * Validation rules for password forgot
     * @param req 
     */
    validate(req: any): Array<object> {
        req.check('email')
           .isEmail().withMessage('Email field is not valid.');

        return req.validationErrors();
    }
}

export default ForgotPasswordValidator;