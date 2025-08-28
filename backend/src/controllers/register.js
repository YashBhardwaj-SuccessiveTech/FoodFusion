import User from "../models/user.js";
import bcrypt from "bcrypt"

export const register = async (req, res)=>{
    const { FirstName, LastName, email, password } = req.body;

    try{
        if(!FirstName ||  !LastName || !email || !password){
            return res.json({
                success: false,
                message:"All fields are necessary"
            });
        }

        const existuser = await User.findOne({email});
        if(existuser){
            return res.json({
                success:false,
                message:"User already registered"
            });
        }

        let hashedPassword;

        try{
            // hash Password
            hashedPassword = await bcrypt.hash(password, 10);
        }catch(error){
            console.log(error);
            return res.json({
                success:false,
                message:"some error in hashing password"
            });
        }

        const newuser = new User({FirstName, LastName, email, password: hashedPassword});
        await newuser.save();
        return res.json({
            success:true,
            message:" User successfully registered",
            newuser
        });

    }catch(error){
        console.log(error);
        return res.json({
            success:false,
            message:"Some error in registering user"
        });
    }
}