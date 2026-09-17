import express from "express";
import { getAboutData, updateAboutData } from "../controllers/aboutController.js";

const router = express.Router();

router.get("/about", getAboutData);
router.put("/about", updateAboutData);
router.post("/about", updateAboutData);

export default router;
