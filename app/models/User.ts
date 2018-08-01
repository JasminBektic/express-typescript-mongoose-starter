import * as mongoose from "mongoose";
import Model from "../models/Model";
import UserSchema from "../schema/UserSchema";


class UserModel extends Model {
    /**
     * Model name
     */
    public static model = 'User';

    /**
     * Model instance
     */
    public getModel(): mongoose.Model<mongoose.Document> {
        return mongoose.model(UserModel.model);
    }

    /**
     * Example method for API call
     */
    public getUsers(): object {
        let data = this.getModel().find()
                                  .limit(20)
                                  .select('name email password');
        return data;
    }
}

UserSchema.loadClass(UserModel);

export default mongoose.model(UserModel.model, UserSchema);