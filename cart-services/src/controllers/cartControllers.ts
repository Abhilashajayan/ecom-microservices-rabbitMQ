import rabbitmq from '../event/rabbitmq'; 
import { Request , Response } from "express"
import { Cart } from '../model/cartSchema';

rabbitmq.connect();

export const addToCart = async (req: Request, res: Response): Promise<any> => {
    const { proId, count } = req.body as any;
    try {
        const channel = await rabbitmq.getChannel();
        let userIdObject: { user: string } = null;
        channel.consume('PRODUCT', (data: any) => {
            userIdObject = JSON.parse(data.content.toString());
            const userId: string = userIdObject?.user;
            console.log('UserId from RabbitMQ:', userId);
            const cartItem = new Cart({
                productId: proId,
                quantity: count,
                userId: userId,
            });
            cartItem.save()
                .then((savedCartItem) => {
                    console.log('Product added to the cart and saved to the database:', savedCartItem);
                    res.status(201).json({ message: 'Product added to the cart and database', cartItem: savedCartItem });
                })
                .catch((dbError) => {
                    console.error('Error saving product to the database:', dbError);
                    res.status(500).json({ error: 'Error saving product to the database' });
                });

            channel.ack(data); 
        });
    } catch (err) {
        console.error('Error consuming RabbitMQ message:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


