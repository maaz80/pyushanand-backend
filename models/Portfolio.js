import mongoose from "mongoose";

const portfolioHeaderSchema = new mongoose.Schema(
  {
    sectionTitle: {
      type: String,
      default: "Portfolio",
    },
    watermarkText: {
      type: String,
      default: "Portfolio",
    },
    description: {
      type: String,
      default:
        "I closely collaborate with stakeholders and interact with users to deliver tailored solutions addressing specific pain points. My focus revolves around the essentials of UI/UX design: instincts, innovation, and intuitive interfaces—the bear necessities for exceptional user experiences.",
    },
    viewAllButtonText: {
      type: String,
      default: "View all projects",
    },
    viewAllButtonLink: {
      type: String,
      default: "#",
    },
  },
  { timestamps: true }
);

const portfolioItemSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      default: "UI/UX Case Study",
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: "/images/bank-image.webp",
    },
    imageAlt: {
      type: String,
      default: "Project Mockup",
    },
    likes: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    projectLink: {
      type: String,
      default: "#",
    },
    linkText: {
      type: String,
      default: "View Project",
    },
    imagePosition: {
      type: String,
      enum: ["left", "right"],
      default: "left",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const PortfolioHeader =
  mongoose.models.PortfolioHeader ||
  mongoose.model("PortfolioHeader", portfolioHeaderSchema);

export const PortfolioItem =
  mongoose.models.PortfolioItem ||
  mongoose.model("PortfolioItem", portfolioItemSchema);
