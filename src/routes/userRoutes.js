import express from "express";
import { loginUser, profileDetails, registerUser } from "../controller/userController.js";
import { validateLogin, validateRegister } from "../middlewares/inputValidator.js";
import { protect } from "../middlewares/protect.js";

const router = express.Router()

router.post("/registeruser",validateRegister,registerUser);
router.post("/login",validateLogin,loginUser);
router.post("/profile",protect,profileDetails);
// router.get("/user",protect,getAllUsers);

export default router;