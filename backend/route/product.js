import express from "express";
import { getProductById, getAllProducts } from "../controller/product.js";
const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/zaza", async (req, res) => {
  console.log("called");
});

export default router;
