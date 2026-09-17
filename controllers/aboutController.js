import About from "../models/About.js";

// Get About section data
export const getAboutData = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create({});
    }
    return res.status(200).json({
      success: true,
      data: about,
    });
  } catch (error) {
    console.error("getAboutData error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Update About section data (Admin)
export const updateAboutData = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create(req.body);
    } else {
      about = await About.findOneAndUpdate({}, req.body, {
        new: true,
        runValidators: true,
      });
    }

    return res.status(200).json({
      success: true,
      message: "About section updated successfully",
      data: about,
    });
  } catch (error) {
    console.error("updateAboutData error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
