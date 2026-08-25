import express from "express";
import { isLoggedIn, isOwner } from "../middleware/authMiddleware.js";
import {
  createProperty,
  deleteProperty,
  getProperties,
  getProperty,
  updateProperty,
} from "../controller/propertyController.js";

const propertyrouter = express.Router();

// Anyone can view
propertyrouter.get("/", getProperties);

propertyrouter.get("/:id", getProperty);

// Only owner can create
propertyrouter.post("/", isLoggedIn, isOwner, createProperty);

// Logged-in owner can update
propertyrouter.patch("/:id", isLoggedIn, isOwner, updateProperty);

// Logged-in owner can delete
propertyrouter.delete("/:id", isLoggedIn, isOwner, deleteProperty);

export default propertyrouter;
