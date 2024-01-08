import { Request , Response } from "express"
import { Order } from "../model/orderSchema";


export const placeOrder = async (req: Request, res: Response): Promise<any> => {
    const { productId, count, price, userId } = req.body;
    try {
      const newOrder = new Order({
        productId,
        count,
        price,
        userId,
      });
      const savedOrder = await newOrder.save();
  
      res.status(201).json({
        success: true,
        message: "Order placed successfully",
        order: savedOrder,
      });
    } catch (err) {
      console.error("Error placing order:", err);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };