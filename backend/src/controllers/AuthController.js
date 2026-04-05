import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req ,res) => {
     try {

        const {name , email , password , role} = req.body;

        if(!name || !email || !password || !role) {
            return res.status(400).json({message:"All fields are required"});
        }

        const user  = await User.findOne({email});

        if(user) {
            return res.status(400).json({message: "User already exists"});
        }
          
        const hashedPassword = await bcrypt.hash(password , 10);

        const newUser = await  User.create({
            name,
            email,
            password : hashedPassword,
            role
        });

        
         res.status(201).json({message : "User registered successfully"});


     }catch (err){
        console.log(err);
        res.status(500).json({message: "server error"});
     }
};

export const login = async (req ,res) => {
    try {
        const {email , password} = req.body;

        if(!email || !password) {
            return res.status(400).json({message:"All fields are required"});
        }

       

        const user = await User.findOne({email});

        

        if(!user)return res.status(400).json({message:"User not found"});

        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch)return res.status(400).json({message:"Invald credentials"});
        
        const token = jwt.sign({userId :user._id , role : user.role}, process.env.JWT_SECRET , {expiresIn : "7d"});
         res.json({
            token ,
            user : {
                userId : user._id,
                name : user.name,
                role : user.role
            }
         });

    }catch(err){
        console.log(err);
        res.status(500).json({message: "server error"});

    }
}