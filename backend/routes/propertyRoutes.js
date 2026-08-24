import express from "express";
import { isLoggedIn } from "../middleware/authMiddleware.js";
import { createProperty, deleteProperty, getProperties, getProperty, updateProperty } from "../controller/propertyController.js";


const propertyrouter = express.Router();

propertyrouter.post("/", isLoggedIn, createProperty);

propertyrouter.get("/", getProperties);

propertyrouter.get("/:id", getProperty);

propertyrouter.patch("/:id", isLoggedIn, updateProperty);

propertyrouter.delete("/:id", isLoggedIn, deleteProperty);

export default propertyrouter ;
