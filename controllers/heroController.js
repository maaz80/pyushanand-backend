import Hero from "../models/Hero.js";

// Get Hero section data
export const getHeroData = async (req, res) => {
  try {
    let hero = await Hero.findOne();
    if (!hero) {
      hero = await Hero.create({});
    }
    return res.status(200).json({
      success: true,
      data: hero,
    });
  } catch (error) {
    console.error("getHeroData error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Update Hero section data (Admin)
export const updateHeroData = async (req, res) => {
  try {
    let hero = await Hero.findOne();
    if (!hero) {
      hero = await Hero.create(req.body);
    } else {
      hero = await Hero.findOneAndUpdate({}, req.body, {
        new: true,
        runValidators: true,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Hero section updated successfully",
      data: hero,
    });
  } catch (error) {
    console.error("updateHeroData error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
