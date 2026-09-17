import Company from "../models/Company.js";

const initialCompanies = [
  { name: "Client Logo 2", image: "/images/comp2.webp", alt: "Client Logo 2", order: 1 },
  { name: "Client Logo 3", image: "/images/comp3.webp", alt: "Client Logo 3", order: 2 },
  { name: "Client Logo 4", image: "/images/comp4.webp", alt: "Client Logo 4", order: 3 },
  { name: "Client Logo 5", image: "/images/comp5.webp", alt: "Client Logo 5", order: 4 },
  { name: "Client Logo 6", image: "/images/comp6.webp", alt: "Client Logo 6", order: 5 },
  { name: "Client Logo 7", image: "/images/comp7.webp", alt: "Client Logo 7", order: 6 },
  { name: "Client Logo 8", image: "/images/comp8.webp", alt: "Client Logo 8", order: 7 },
];

// GET all company logos
export const getCompanies = async (req, res) => {
  try {
    let companies = await Company.find().sort({ order: 1, createdAt: 1 });

    // Seed initial companies if database is empty
    if (companies.length === 0) {
      companies = await Company.insertMany(initialCompanies);
    }

    return res.status(200).json({
      success: true,
      data: companies,
    });
  } catch (error) {
    console.error("getCompanies error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// POST create a new company logo
export const createCompany = async (req, res) => {
  try {
    const count = await Company.countDocuments();
    const newCompany = await Company.create({
      ...req.body,
      order: req.body.order !== undefined ? req.body.order : count + 1,
    });

    return res.status(201).json({
      success: true,
      message: "Company logo created successfully",
      data: newCompany,
    });
  } catch (error) {
    console.error("createCompany error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// PUT update an existing company logo
export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCompany = await Company.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCompany) {
      return res.status(404).json({
        success: false,
        error: "Company logo not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Company logo updated successfully",
      data: updatedCompany,
    });
  } catch (error) {
    console.error("updateCompany error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// DELETE a company logo
export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCompany = await Company.findByIdAndDelete(id);

    if (!deletedCompany) {
      return res.status(404).json({
        success: false,
        error: "Company logo not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Company logo deleted successfully",
      data: deletedCompany,
    });
  } catch (error) {
    console.error("deleteCompany error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
