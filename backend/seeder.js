import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./model/user.js";
import Order from "./model/order.js";
import Product from "./model/product.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampledProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampledProducts);

    console.log("Data imported!".green.inverse);
    process.exit(0);
  } catch (error) {
    console.log(error.message.red.bold);
    process.exit(0);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data destroyed!".red.inverse);
    process.exit(0);
  } catch (error) {
    console.log(error.message.red.bold);
    process.exit(0);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
