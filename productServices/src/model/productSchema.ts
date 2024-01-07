import mongoose,{Types, Schema, model} from "mongoose";
import { ProductTypes } from "../types/types";

const productSchema = new Schema<ProductTypes>({
    name: String,
    price: String,
    details: String,
    created_at: {
        type: Date,
        default: Date.now()
    }
});
const Product = model("Product", productSchema)
export {Product , ProductTypes}