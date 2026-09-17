import { ResumeHeader, ResumeExperience } from "../models/Resume.js";

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

// GET full resume section data (Header + Experiences)
export const getResumeData = async (req, res) => {
  try {
    let header = await ResumeHeader.findOne();
    if (!header) {
      header = await ResumeHeader.create({});
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
    let header = await ResumeHeader.findOne();
    if (!header) {
      header = await ResumeHeader.create(req.body);
    } else {
      header = await ResumeHeader.findOneAndUpdate({}, req.body, {
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
