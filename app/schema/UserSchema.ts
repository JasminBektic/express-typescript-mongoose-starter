import { Schema } from "mongoose";


class UserSchema extends Schema {
    public constructor() {
        super({
                name: String,
                email: String,
                password: String,
                token: String
            }, 
            { timestamps: true }
        );
    }
}

export default new UserSchema;