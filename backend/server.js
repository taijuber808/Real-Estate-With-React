import express from "express";
import dotenv from "dotenv";
import { DBConnect } from "./config/db.js";
import router from "./routes/authRoutes.js";
import propertyrouter from "./routes/propertyRoutes.js";
import Wishlistrouter from "./routes/wishlistRoutes.js";
import cors from "cors";
import profileRoutes from "./routes/profileRoute.js";
import enquiryrouter from "./routes/enquiryRoutes.js";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use("/api/auth", router);
app.use("/api/properties", propertyrouter);
app.use("/api/wishlist", Wishlistrouter);
app.use("/api/profile", profileRoutes);
app.use("/api/enquiry", enquiryrouter);

await DBConnect();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
