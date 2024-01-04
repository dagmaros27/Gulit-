import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`mongodb connected to ${conn.connection.host}`.cyan.underline);
  } catch (e) {
    console.log(e.message.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
