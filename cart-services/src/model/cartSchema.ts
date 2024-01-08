import mongoose,{Types, Schema, model} from "mongoose";
import { cartTypes } from "../types/type";


const cartSchema = new Schema<cartTypes>({
    productId: String,
    quantity : Number,
    userId : String,
    created_at: {
        type: Date,
        default: Date.now()
    }
});
const Cart = model("Cart", cartSchema)
export {Cart , cartTypes}