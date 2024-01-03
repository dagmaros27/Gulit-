import express from "express";
import products from "./data/products.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.get("/", (req, res) => {
  res.send("api is serving");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(
  port,
  console.log(
    `server listening in ${process.env.NODE_ENV} mode on port ${port}`
  )
);
