import express from "express";
import {
  getPortfolioData,
  updatePortfolioHeader,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} from "../controllers/portfolioController.js";

const router = express.Router();

router.get("/portfolio", getPortfolioData);
router.put("/portfolio/header", updatePortfolioHeader);

router.post("/portfolio/items", createPortfolioItem);
router.put("/portfolio/items/:id", updatePortfolioItem);
router.delete("/portfolio/items/:id", deletePortfolioItem);

export default router;
