import { Request, Response, NextFunction } from 'express';


export const registerUser = (reg: Request , res: Response)=>{
     const { name , email , password } = reg.body;
     
}