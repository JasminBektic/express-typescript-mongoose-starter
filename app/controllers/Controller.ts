import IValidator from "../validators/IValidator";


abstract class Controller {
    /**
     * Validator instance
     */
    public validator: IValidator;

    constructor(validator: IValidator) {
        this.validator = validator;
    }
}

export default Controller;