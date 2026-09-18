import { ResumeHeader, ResumeExperience } from "../models/Resume.js";
import cloudinary from "../config/cloudinary.js";
import https from "https";
import http from "http";

const initialExperiences = [
  {
    company: "Designit - a Wipro Company",
    role: "Principal Experience Designer",
    location: "Bengaluru, India",
    period: "2022 - Present",
    order: 1,
  },
  {
    company: "YesBank Ltd",
    role: "Sr. Lead UI UX Designer (Vice President)",
    location: "Gurugram, India",
    period: "2019 - 2022",
    order: 2,
  },
  {
    company: "Etisalat",
    role: "UI UX Expert",
    location: "Dubai, UAE",
    period: "2017 - 2019",
    order: 3,
  },
  {
    company: "Gadgets360, NDTV",
    role: "Sr. UI UX Designer",
    location: "New Delhi, India",
    period: "2015 - 2017",
    order: 4,
  },
  {
    company: "OLX",
    role: "Sr. Digital Designer",
    location: "Gurugram, India",
    period: "2014 - 2015",
    order: 5,
  },
];

// Helper to ensure clean URL without invalid Cloudinary flags
const getCleanDownloadUrl = (url) => {
  if (url && typeof url === "string") {
    return url.replace("/upload/fl_attachment/", "/upload/").replace("/fl_attachment", "");
  }
  return url;
};

// GET full resume section data (Header + Experiences)
export const getResumeData = async (req, res) => {
  try {
    let header = await ResumeHeader.findOne();
    if (!header) {
      header = await ResumeHeader.create({});
    } else if (header.downloadLink && header.downloadLink.includes("fl_attachment")) {
      header.downloadLink = getCleanDownloadUrl(header.downloadLink);
      await header.save();
    }

    let experiences = await ResumeExperience.find().sort({ order: 1, createdAt: 1 });

    // Auto-seed initial 5 static experiences if none exist
    if (experiences.length === 0) {
      experiences = await ResumeExperience.insertMany(initialExperiences);
    }

    return res.status(200).json({
      success: true,
      data: {
        header,
        experiences,
      },
    });
  } catch (error) {
    console.error("getResumeData error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// PUT update resume header metadata
export const updateResumeHeader = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.downloadLink) {
      updateData.downloadLink = getCleanDownloadUrl(updateData.downloadLink);
    }

    let header = await ResumeHeader.findOne();
    if (!header) {
      header = await ResumeHeader.create(updateData);
    } else {
      header = await ResumeHeader.findOneAndUpdate({}, updateData, {
        new: true,
        runValidators: true,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Resume header updated successfully",
      data: header,
    });
  } catch (error) {
    console.error("updateResumeHeader error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// POST create a new experience entry
export const createExperience = async (req, res) => {
  try {
    const count = await ResumeExperience.countDocuments();
    const newExp = await ResumeExperience.create({
      ...req.body,
      order: req.body.order !== undefined ? req.body.order : count + 1,
    });

    return res.status(201).json({
      success: true,
      message: "Experience added successfully",
      data: newExp,
    });
  } catch (error) {
    console.error("createExperience error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// PUT update an experience entry
export const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExp = await ResumeExperience.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedExp) {
      return res.status(404).json({
        success: false,
        error: "Experience entry not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      data: updatedExp,
    });
  } catch (error) {
    console.error("updateExperience error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// DELETE an experience entry
export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExp = await ResumeExperience.findByIdAndDelete(id);

    if (!deletedExp) {
      return res.status(404).json({
        success: false,
        error: "Experience entry not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
      data: deletedExp,
    });
  } catch (error) {
    console.error("deleteExperience error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// POST upload resume PDF file to Cloudinary and save URL
export const uploadResumePdf = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({
        success: false,
        error: "No PDF file uploaded",
      });
    }

    const pdfUrl = getCleanDownloadUrl(req.file.path);

    // Update ResumeHeader with the new download link
    let header = await ResumeHeader.findOne();
    if (!header) {
      header = await ResumeHeader.create({ downloadLink: pdfUrl });
    } else {
      header = await ResumeHeader.findOneAndUpdate(
        {},
        { downloadLink: pdfUrl },
        { new: true, runValidators: true }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Resume PDF uploaded successfully",
      data: { downloadLink: pdfUrl, header },
    });
  } catch (error) {
    console.error("uploadResumePdf error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// GET proxy download resume PDF
export const downloadResumePdf = async (req, res) => {
  try {
    const header = await ResumeHeader.findOne();
    const fileUrl = header?.downloadLink;

    if (!fileUrl || fileUrl === "#download-resume" || !fileUrl.startsWith("http")) {
      return res.status(404).send("No resume uploaded yet.");
    }

    const client = fileUrl.startsWith("https") ? https : http;
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/pdf,application/octet-stream,*/*'
      }
    };

    client.get(fileUrl, options, (fileRes) => {
      if (fileRes.statusCode !== 200) {
        return res.status(fileRes.statusCode).send("Failed to fetch file from storage.");
      }

      let filename = "Latest-CV.pdf";
      const parts = fileUrl.split("/");
      const lastPart = parts[parts.length - 1];
      if (lastPart && lastPart.toLowerCase().endsWith(".pdf")) {
        filename = decodeURIComponent(lastPart);
      }

      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Content-Type", "application/pdf");

      fileRes.pipe(res);
    }).on("error", (err) => {
      console.error("Error downloading file:", err);
      res.status(500).send("Error downloading file");
    });
  } catch (error) {
    console.error("downloadResumePdf error:", error);
    res.status(500).send("Server error");
  }
};
