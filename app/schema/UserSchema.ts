import { Schema } from "mongoose";


class UserSchema extends Schema {
    public constructor() {
        super({
                name: {
                    type: String
                    // required: [true, 'Name field is required.']
                },
                email: String,
                password: String
            }, 
            { timestamps: true }
        );
    }
}

export default new UserSchema;