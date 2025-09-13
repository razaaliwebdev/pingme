import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected Successfully...`);
  } catch (error) {
    console.log("Failed to connect DB , Error:", error);
    process.exit(1);
  }
};

export default connectDb;
