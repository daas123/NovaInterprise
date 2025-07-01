import express from "express";
import { deleteUser, getAllUsers, getUserById, loginUser, registerUser, updateUser } from "../controller/userController.js";
import { validateLogin, validateRegister } from "../middlewares/inputValidator.js";
import { loginUserService } from "../models/userModel.js";

const router = express.Router()

router.post("/registerUser",validateRegister,registerUser);
router.post("/login",validateLogin,loginUser);
// router.get("/user",getAllUsers);
// router.post("/user",validateUser,createUser);
// router.get("/user/:id",getUserById);
// router.put("/user/:id",validateUser,updateUser);
// router.delete("/user/:id",deleteUser);

export default router;