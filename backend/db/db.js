// db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://joshiharshit291:Harshit12345@cluster0.khhvoyf.mongodb.net/?retryWrites=true&w=majority", {
      dbName: "test", // 🔁 specify DB name
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default connectDB;
