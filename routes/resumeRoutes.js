import express from "express";
import {
  getResumeData,
  updateResumeHeader,
  createExperience,
  updateExperience,
  deleteExperience,
  uploadResumePdf,
} from "../controllers/resumeController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.get("/resume", getResumeData);
router.put("/resume/header", updateResumeHeader);
router.post("/resume/upload-pdf", ...upload.single("resumePdf"), uploadResumePdf);

router.post("/resume/experiences", createExperience);
router.put("/resume/experiences/:id", updateExperience);
router.delete("/resume/experiences/:id", deleteExperience);

export default router;
