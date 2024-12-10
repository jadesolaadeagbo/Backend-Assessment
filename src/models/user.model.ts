import mongoose, { Document, Schema, Model } from "mongoose";
import { ObjectId } from "mongoose";

export enum Role{
    Admin = "admin",
    User = "user"
}

export interface IUser extends Document{
    _id: ObjectId;
    username: string;
    email: string;
    password: string;
    role: Role;
}

const UserSchema: Schema<IUser>  = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role:{ type: String, enum: Object.values(Role), default: Role.User, required: true }
})

export const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema)