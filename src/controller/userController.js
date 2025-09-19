import { loginUserService, profileDetailsService, registerUserService } from "../models/userModel.js"
import jwt from "jsonwebtoken";

// Standardized response Function
const handleResponse = (res,status,message,data = null) =>{
    res.status(status).json({
        status,
        message,
        data,
    })
}

export const registerUser = async (req,res,next) => {
  const { email, phone, password } = req.body;

  try {
    const emailPrefix = email.split('@')[0];
    const randomSuffix = Math.random().toString(36).substring(2, 6);
    const username = `${emailPrefix}_${randomSuffix}`;
    console.log(email, phone, password,username);
    const register = await registerUserService(email, phone, password, username);
    handleResponse(res,201,"Register Successful","Registered");
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await loginUserService(email, password);
        if (!user) {
            return handleResponse(res,401,"Invalid email or password","");
        }

        delete user.password; // remove password

        // JWT generate
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
        );

        return handleResponse(res, 200, "Login successful", { token });
    } catch (err) {
        console.error("Login error:", err); 
        return handleResponse(res, 500, "Something went wrong", err.message);
    }
};


export const profileDetails = async (req,res,next) => {
    try{
        console.log(req)
        const user = await profileDetailsService( req.userId )
        delete user.password
        console.log(user)
        if (!user) {
            return handleResponse(res,401,"Invalid User id");
        }

        if (user == null){
             return handleResponse(res,401,"Invalid User id");
        }
        handleResponse(res,201,"Profile Fetched",{user});
    }catch(err){
        console.error("", err); 
        return handleResponse(res, 500, "Something went wrong", err.message);
    }
}