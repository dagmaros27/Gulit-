import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import userRoutes from "./route/user.js";
import productRoutes from "./route/product.js";
import { notFound, errorHandler } from "./middleware/error.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.get("/", (req, res) => {
  res.send("api is serving");
});
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(
  port,
  console.log(
    `server listening in ${process.env.NODE_ENV} mode on port ${port}`.bgGreen
  )
);
