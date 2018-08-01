import * as mongoose from "mongoose";


abstract class Model {
    /**
     * Get model to work with
     */
    abstract getModel(): mongoose.Model<mongoose.Document>;
}

export default Model;