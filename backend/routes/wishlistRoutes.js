import express from "express";

import {
  addWishlist,
  getWishlist,
  removeWishlist,
} from "../controller/wishlistController.js";

import { isLoggedIn } from "../middleware/authMiddleware.js";

const Wishlistrouter = express.Router();

Wishlistrouter.post("/:propertyId", isLoggedIn, addWishlist);

Wishlistrouter.get("/", isLoggedIn, getWishlist);

Wishlistrouter.delete("/:propertyId", isLoggedIn, removeWishlist);

export default Wishlistrouter;