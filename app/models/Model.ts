import { model } from "mongoose";


abstract class Model {
    /**
     * Get model to work with
     */
    abstract getModel(): Model;
}

export default Model;