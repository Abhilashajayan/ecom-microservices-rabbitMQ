import mongoose,{Types, Schema, model} from "mongoose";
import { orderTypes } from "../types/types";


const orderSchema = new Schema<orderTypes>({
    productId: String,
    count : Number,
    userId : String,
    price : Number,
    created_at: {
        type: Date,
        default: Date.now()
    }
});
const Order = model("Order", orderSchema)
export {Order , orderTypes}