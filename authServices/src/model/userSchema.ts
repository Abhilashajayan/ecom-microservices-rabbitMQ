import mongoose,{Types, Schema, model} from "mongoose";
import { chekType } from "../types/types";

const userSchema = new Schema<chekType>({
    name: String,
    password: String,
    email: String,
    created_at: {
        type: Date,
        default: Date.now()
    }
});
const User = model("User", userSchema)
export {User , chekType}