import mongoose from "mongoose";

const resumeHeaderSchema = new mongoose.Schema(
  {
    sectionTitle: {
      type: String,
      default: "Resume",
    },
    description: {
      type: String,
      default:
        "My extensive background includes successful collaborations across various industries, addressing unique challenges and delivering designs aligned with customer needs and business goals.",
    },
    experienceLabel: {
      type: String,
      default: "Professional Experiences",
    },
    downloadText: {
      type: String,
      default: "download resume",
    },
    downloadLink: {
      type: String,
      default: "#download-resume",
    },
  },
  { timestamps: true }
);

const resumeExperienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: "",
    },
    period: {
      type: String,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const ResumeHeader =
  mongoose.models.ResumeHeader ||
  mongoose.model("ResumeHeader", resumeHeaderSchema);

export const ResumeExperience =
  mongoose.models.ResumeExperience ||
  mongoose.model("ResumeExperience", resumeExperienceSchema);
