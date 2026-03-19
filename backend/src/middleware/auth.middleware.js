import jwt from "jsonwebtoken";
import {env} from "../config/env.js";




export const authMiddleware = (req,res,next) =>{
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({message:"Unauthorized"});
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, env.JWT_SECRET);
      req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };



        next();
    } catch (error) {
        res.status(401).json({message:"Invalid or expired token"});
    }
}