import express from "express";
import { isLoggedIn } from "../middleware/authMiddleware.js";
import { createEnquiry, getOwnerEnquiries } from "../controller/enquiryContoller.js";

const enquiryrouter = express.Router();

enquiryrouter.post("/", isLoggedIn, createEnquiry);
enquiryrouter.get("/owner", isLoggedIn, getOwnerEnquiries);

export default enquiryrouter;