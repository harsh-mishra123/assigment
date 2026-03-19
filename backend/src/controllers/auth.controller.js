import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.model.js";
import {env} from "../config/env.js";





export const login = async (req,res)=>{
    try{
        const {username,password} = req.body;


        if(!username || !password){
            return  res.status(400).json({error:"Username and password are required"});
        }

        const user = await User.findOne({username}).select("+password");

       if(!user){
        return res.status(401).json({error:"Invalid credentials"});
       }

       const isMatch = await bcrypt.compare(password,user.password);
          if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
 const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


