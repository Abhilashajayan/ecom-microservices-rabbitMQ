import rabbitmq from '../event/rabbitmq'; 
import { Request , Response } from "express"

rabbitmq.connect();

export const addToCart =  async ( req: Request, res: Response):Promise<any> => {
    const { proId , count } = req.body as any;
    try{
    const channel = await rabbitmq.getChannel(); 
    let order : string;
    channel.consume("PRODUCT", (data: any) => {
        order = JSON.parse(data.content.toString());
        channel.ack(data);
    });
    console.log(order, count);
}catch(err){
    console.log(err);
}

}