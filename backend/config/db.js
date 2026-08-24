import mongoose from "mongoose"

export const DBConnect = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDb  connected")
    } catch (error) {
        console.log(error.message)
    }
}