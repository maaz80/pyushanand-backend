import express from "express";
import { getFooterData, updateFooterData } from "../controllers/footerController.js";

const router = express.Router();

router.get("/footer", getFooterData);
router.put("/footer", updateFooterData);
router.post("/footer", updateFooterData);

export default router;
