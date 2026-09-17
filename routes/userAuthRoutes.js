import express from "express";
import { loginUser } from "../controllers/userAuthController.js";

const router = express.Router();

router.post("/user/login", loginUser);

export default router;
