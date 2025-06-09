import { createUserService, deleteUserService, getAllUsersService, getUsersByIdService, updateUserService } from "../models/userModel.js"

// Standardized response Function
const handleResponse = (res,status,message,data = null) =>{
    res.status(status).json({
        status,
        message,
        data,
    })
}

export const createUser = async (req,res,next) => {
    const name = req.body.name
    const email = req.body.email

    try{
        const newUser = await createUserService(name,email);
        handleResponse(res,201,"User created successfully",newUser);
    } catch(err){
        next(err);
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