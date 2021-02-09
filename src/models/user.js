import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        email: { type: String },
        firstName: { type: String },
        lastName: { type: String },
        password: { type: String },
        token: { type: String },
        expTime: { type: Number },
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const User = new model('User', userSchema);
export default User;
