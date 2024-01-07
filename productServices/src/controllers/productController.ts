import { Request , Response } from "express"
import { Product } from "../model/productSchema";
import rabbitmq from '../event/rabbitmq'; 

rabbitmq.connect(); 
let order:any = null ;

export const createProduct = async (req : Request , res : Response):Promise<any> =>{
    const  { name , details , price } = req.body;
    try {
        
        const newProduct  = new Product ({
            name,
            details,
            price,
        });
        await newProduct.save();
        
        return res.status(200).json({ order , message : "the product is added successfully"});
    }catch(err){
        return res.status(404).json({ err });
    }
}

