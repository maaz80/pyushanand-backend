import express from "express";
import {
  getResumeData,
  updateResumeHeader,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/resumeController.js";

const router = express.Router();

router.get("/resume", getResumeData);
router.put("/resume/header", updateResumeHeader);

router.post("/resume/experiences", createExperience);
router.put("/resume/experiences/:id", updateExperience);
router.delete("/resume/experiences/:id", deleteExperience);

export default router;
