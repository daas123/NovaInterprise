import { createUserService, deleteUserService, getAllUsersService, getUsersByIdService, loginUserService, registerUserService, updateUserService } from "../models/userModel.js"
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
    const { name, email, phone, password } = req.body;

    try {
        console.log(name, email, phone, password);
        const register = await registerUserService(name,email,phone,password);
        handleResponse(res,201,"Register Successfull","");
    } catch(err){
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

        return handleResponse(res, 200, "Login successful", { ...user, token });
    } catch (err) {
        console.error("Login error:", err); 
        return handleResponse(res, 500, "Something went wrong", err.message);
    }
};



export const getAllUsers = async (req,res,next) => {
    try{
        const users = await getAllUsersService();
        handleResponse(res,201,"User fetched successfully",users);
    } catch(err){
        next(err);
    }
};

export const getUserById = async (req,res,next) => {
    const id = req.params.id

    try{
        const user = await getUsersByIdService(id);
        handleResponse(res,201,"User fetched successfully",user);
    } catch(err){
        next(err);
    }
};

export const updateUser = async (req,res,next) => {
    const name = req.body.name
    const email = req.body.email
    const id = req.params.id

    try{
        const updatedUser = await updateUserService(id,name,email);
        if (!updatedUser) return handleResponse(res,404,"User not found");
        handleResponse(res,201,"User fetched successfully",updatedUser);
    } catch(err){
        next(err);
    }
};

export const deleteUser = async (req,res,next) => {
    const id = req.params.id

    try{
        const deleteUser = await deleteUserService(id);
        if (!deleteUser) return handleResponse(res,404,"User not found");
        handleResponse(res,201,"User Deleted successfully",deleteUser);
    } catch(err){
        next(err);
    }
};