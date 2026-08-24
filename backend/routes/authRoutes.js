import express from "express";
import { getProfile, loginUser, registerUser } from "../controller/authController.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", isLoggedIn, getProfile);



export default router;