import { Request, Response, NextFunction } from 'express';
import { User } from '../model/userSchema';
import bcrypt from 'bcrypt';
import rabbitmq from '../event/rabbitmq'; 
rabbitmq.connect(); 


export const registerUser = async(reg: Request , res: Response): Promise<any>=>{
     const { name , email , password } = reg.body;
     try{
          const hashedPassword = await bcrypt.hash(password, 10);
          const existUser = await User.findOne({ email: email });
          if(existUser){
               return res.json("the user is already registered");
          }else{
               const user = new User({
                    name,
                    email,
                    password:hashedPassword,
               })
               user.save()
               res.status(200).json({success: true,message: 'User registered successfully',});
          }
     
     }catch(err){
          console.error('Error during registration:', err);
          res.status(500).json({success: false,message: 'Internal Server Error',});
     }
}

export const userLogin = async (req: Request, res: Response): Promise<any> => {
     const { email, password } = req.body;
     try {
         const existUser = await User.findOne({ email: email });
 
         if (existUser) {
             const isMatch = await bcrypt.compare(password, existUser.password);
 
             if (!isMatch) {
                 return res.status(400).json({ error: "Invalid Password !!" });
             }
             const channel = await rabbitmq.getChannel();
             await channel.sendToQueue(
                 'PRODUCT',
                 Buffer.from(JSON.stringify({
                     user: existUser.id,
                 }))
             );
 
             return res.status(200).json({ user: existUser, message: "Login successful" });
 
         } else {
             return res.status(400).json({ error: "User does not exist" });
         }
     } catch (err) {
         console.error('Error during login:', err);
         res.status(500).json({ error: 'Internal Server Error' });
     }
 };