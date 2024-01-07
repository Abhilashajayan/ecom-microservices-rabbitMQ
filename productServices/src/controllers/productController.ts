import { Request , Response } from "express"
import { Product } from "../model/productSchema";
import rabbitmq from '../event/rabbitmq'; 

export const createProduct = async (req : Request , res : Response):Promise<any> =>{
    const  { name , details , price } = req.body;
    try {
        const newProduct  = new Product ({
            name,
            details,
            price,
        });
        await newProduct.save();
        return res.status(200).json({newProduct , message : "the product is added successfully"});
    }catch(err){
        return res.status(404).json({ err });
    }
}

export const addToCart = async (req : Request , res : Response):Promise<any> => {
    const {ids} = req.body;
   try{
    const products = await Product.find({_id: {$in: ids}}); 
    console.log(products);
   }catch(err){
    return res.status(404).json({err });
   }
}