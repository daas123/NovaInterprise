import express from "express";
import { getProfileDetails, loginUser, registerUser, updateProfileDetails } from "../controller/userController.js";
import { validateLogin, validateRegister } from "../middlewares/inputValidator.js";
import { protect } from "../middlewares/protect.js";

const router = express.Router()

router.post("/registeruser",validateRegister,registerUser);
router.post("/login",validateLogin,loginUser);
router.post("/profile",protect,updateProfileDetails);
router.get("/profile",protect,getProfileDetails);
// router.get("/user",protect,getAllUsers);

export default router;