import { PortfolioHeader, PortfolioItem } from "../models/Portfolio.js";

const initialProjects = [
  {
    category: "Banking",
    title:
      "Transforming “Genie” into a User-Centric Hub: digitised services, accessible, usable, and efficient",
    image: "/images/bank-image.webp",
    imageAlt: "Genie Banking Dashboard UI Mockup",
    likes: 6,
    tags: [
      "Heuristic Evaluation",
      "Prototype",
      "Usability Testing",
      "User Interviews",
      "User Research",
      "Wire-framing",
    ],
    projectLink: "#project-genie",
    linkText: "View Project",
    imagePosition: "left",
    order: 1,
  },
  {
    category: "Finance",
    title:
      "Money Matters Made Simple: A UI/UX Case Study on “Personal Finance Management”",
    image: "/images/finance-image.webp",
    imageAlt: "Personal Finance Management UI/UX Case Study",
    likes: 6,
    tags: [
      "Affinity Diagram",
      "Heuristic Evaluation",
      "Prototype",
      "Survey - Quantitative & Qualitative Survey",
      "Usability Testing",
      "User Interviews",
      "User Research",
      "Wire-framing",
    ],
    projectLink: "#project-finance",
    linkText: "view project",
    imagePosition: "right",
    order: 2,
  },
  {
    category: "Wellbeing",
    title:
      "Insijam: The Canvas of Empowerment “A UI/UX Narrative of Insijam’s Journey”",
    image: "/images/wellbeing-image.webp",
    imageAlt: "Insijam UI/UX Narrative Case Study",
    likes: 4,
    tags: [
      "Heuristic Evaluation",
      "Prototype",
      "Target Audience",
      "Usability Testing",
      "User Interviews",
      "User Research",
      "Wire-framing",
    ],
    projectLink: "#project-insijam",
    linkText: "View Project",
    imagePosition: "left",
    order: 3,
  },
  {
    category: "Wellbeing",
    title:
      "Design Thinking & Innovation – Burn, Maintain, Care, Restore: A Journey Towards Holistic Well-being",
    image: "/images/wellbeing2-image.webp",
    imageAlt: "Design Thinking & Innovation - BMCR",
    likes: 3,
    tags: [
      "Customer Journey MAP",
      "Prototype",
      "User Research",
      "Visual Design",
    ],
    projectLink: "#project-bmcr",
    linkText: "view project",
    imagePosition: "right",
    order: 4,
  },
];

// GET full portfolio data (Header + Projects)
export const getPortfolioData = async (req, res) => {
  try {
    let header = await PortfolioHeader.findOne();
    if (!header) {
      header = await PortfolioHeader.create({});
    }

    let projects = await PortfolioItem.find().sort({ order: 1, createdAt: 1 });

    // Seed default projects if none exist in DB
    if (projects.length === 0) {
      projects = await PortfolioItem.insertMany(initialProjects);
    }

    return res.status(200).json({
      success: true,
      data: {
        header,
        projects,
      },
    });
  } catch (error) {
    console.error("getPortfolioData error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// PUT update portfolio header details
export const updatePortfolioHeader = async (req, res) => {
  try {
    let header = await PortfolioHeader.findOne();
    if (!header) {
      header = await PortfolioHeader.create(req.body);
    } else {
      header = await PortfolioHeader.findOneAndUpdate({}, req.body, {
        new: true,
        runValidators: true,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Portfolio header updated successfully",
      data: header,
    });
  } catch (error) {
    console.error("updatePortfolioHeader error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// POST create new portfolio project item
export const createPortfolioItem = async (req, res) => {
  try {
    const itemCount = await PortfolioItem.countDocuments();
    const newProject = await PortfolioItem.create({
      ...req.body,
      order: req.body.order !== undefined ? req.body.order : itemCount + 1,
    });

    return res.status(201).json({
      success: true,
      message: "Portfolio project created successfully",
      data: newProject,
    });
  } catch (error) {
    console.error("createPortfolioItem error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// PUT update an existing portfolio project item
export const updatePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProject = await PortfolioItem.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        error: "Portfolio project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Portfolio project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    console.error("updatePortfolioItem error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// DELETE a portfolio project item
export const deletePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await PortfolioItem.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        error: "Portfolio project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Portfolio project deleted successfully",
      data: deletedProject,
    });
  } catch (error) {
    console.error("deletePortfolioItem error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
