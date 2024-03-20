import express from "express";
import {
  asyncUser,
  registerUser,
  getUser,
  updateUser,
} from "../controller/user.js";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();

router.post("/", registerUser);
router.post("/login", asyncUser);

router.get("/profile", authMiddleware, getUser);
router.put("/profile", authMiddleware, updateUser);

export default router;
