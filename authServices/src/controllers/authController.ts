import { Request, Response, NextFunction } from 'express';
import { User } from '../model/userSchema';
import bcrypt from 'bcrypt';

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

export const userLogin = async(reg: Request , res: Response)=>{
     const { email , password } = reg.body;
     try{
          const exitUser = await User.findOne({ email: email});
          if(exitUser){
               const isMatch = await bcrypt.compare(password, exitUser.password);
                if (!isMatch)
                    {
                      return res.status(400).json({ error: "Invalid Password !!" });
                    }
                    return res.status(200).json({ exitUser,message :"the login sucess full" });
          }else{
                    return res.status(400).json({ error: "User does not exist" });
          }
     }catch(err){
          res.status(500).json(err);
     }
}