import { User } from "../models/user.model.js";
import { hashPassword } from "../utils/security.js";
import { generateVerificationCode } from "../utils/generateverificationcode.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../mailtrap/email.js";
export const signup = async (req,res) =>{

    const {email,password,name} = req.body;
    try{

        if(!email || !password || !name){
            return res.status(400).json({success: false,message: "All fields are required"});

        }

        const existingUser = await User.findOne({email});
        if(existingUser){

            return res.status(400).json({success: false,message: "User already exists"});
        }

        const hashedPassword = await hashPassword(password);
        const verificationToken = generateVerificationCode();
        const newUser = new User({
            email : email,
            password : hashedPassword,
            name : name,
            verificationToken : verificationToken,
            verificationTokenExpiresAt : Date.now() + 1000*60*60*24
        });

        await newUser.save();

        //Jwt
        generateTokenAndSetCookie(res,newUser._id);
        await sendVerificationEmail(newUser.email,verificationToken)
        
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user : {
                ...newUser._doc,
                password : undefined
            }
        })


    } catch(error){
        return res.status(500).json({message: error.message});
    }

    res.send("signup route")
}

export const login = async (req,res) =>{
    res.send("login route")
}

export const logout = async (req,res) =>{
    res.send("logout route")
}
