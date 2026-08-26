import express from "express";
import { getProfile, updateProfile } from "../controller/profileController.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";

const profileRoutes = express.Router();

profileRoutes.get("/", isLoggedIn, getProfile);
profileRoutes.patch("/", isLoggedIn, updateProfile);

export default profileRoutes;