import Footer from "../models/Footer.js";

// GET Footer section data
export const getFooterData = async (req, res) => {
  try {
    let footer = await Footer.findOne();
    if (!footer) {
      footer = await Footer.create({});
    }
    return res.status(200).json({
      success: true,
      data: footer,
    });
  } catch (error) {
    console.error("getFooterData error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// UPDATE Footer section data (Admin)
export const updateFooterData = async (req, res) => {
  try {
    let footer = await Footer.findOne();
    if (!footer) {
      footer = await Footer.create(req.body);
    } else {
      footer = await Footer.findOneAndUpdate({}, req.body, {
        new: true,
        runValidators: true,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Footer section updated successfully",
      data: footer,
    });
  } catch (error) {
    console.error("updateFooterData error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
