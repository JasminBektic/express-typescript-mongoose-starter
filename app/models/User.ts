import * as mongoose from "mongoose";


class UserSchema extends mongoose.Schema {
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

const User = mongoose.model('User', new UserSchema);

export { User };