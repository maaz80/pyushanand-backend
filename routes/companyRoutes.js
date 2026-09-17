import express from "express";
import {
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../controllers/companyController.js";

const router = express.Router();

router.get("/companies", getCompanies);
router.post("/companies", createCompany);
router.put("/companies/:id", updateCompany);
router.delete("/companies/:id", deleteCompany);

export default router;
