interface IValidator {
    /**
     * Common validation method
     */
    validate(req: any): void;
}

export default IValidator;