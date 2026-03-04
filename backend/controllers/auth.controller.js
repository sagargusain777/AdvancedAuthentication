import { User } from "../models/user.model.js";
import { hashPassword } from "../utils/security.js";
import { generateVerificationCode } from "../utils/generateverificationcode.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail , sendWelcomeEmail } from "../mailtrap/email.js";
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

    
}
export const verifyemail = async(req,res) =>{

    const {code} = req.body;
    try {
        const user = await User.findOne({
            verificationToken : code ,
            verificationTokenExpiresAt : { $gt : Date.now()}
        })

        if(!user){
            return res.status(400).json({ success : false , message : "Invalid or Expired Verification code"})
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email , user.name)
        res.status(201).json({success:true, message : "User Email Verified Successfully" })
        
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
   

}
export const login = async (req,res) =>{
    res.send("login route")
}

export const logout = async (req,res) =>{
    res.send("logout route")
}
