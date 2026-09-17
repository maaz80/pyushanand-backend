import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Client Logo",
    },
    image: {
      type: String,
      required: true,
      default: "/images/comp2.webp",
    },
    alt: {
      type: String,
      default: "Client Logo",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Company =
  mongoose.models.Company || mongoose.model("Company", companySchema);

export default Company;
