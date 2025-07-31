import mongoose from "mongoose";


const connectDB = async () => {
 
    await mongoose.connect("mongodb+srv://joshiharshit291:Harshit12345@cluster0.khhvoyf.mongodb.net"),
    console.log("Connected to MongoDB");
}

export default connectDB;

