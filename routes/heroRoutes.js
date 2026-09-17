import express from "express";
import { getHeroData, updateHeroData } from "../controllers/heroController.js";

const router = express.Router();

router.get("/hero", getHeroData);
router.put("/hero", updateHeroData);
router.post("/hero", updateHeroData);

export default router;
