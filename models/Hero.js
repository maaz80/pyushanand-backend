import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    logoUrl: {
      type: String,
      default: "/images/logo.webp",
    },
    logoAlt: {
      type: String,
      default: "Pyush Anand Logo",
    },
    // Line 1
    titleLine1Prefix: {
      type: String,
      default: "Principal",
    },
    highlight1Text: {
      type: String,
      default: "Experience",
    },
    highlight1Color: {
      type: String,
      default: "#00c853",
    },
    badge1Text: {
      type: String,
      default: "User Experience Audit",
    },
    badge1Color: {
      type: String,
      default: "#00c853",
    },
    // Line 2
    titleLine2: {
      type: String,
      default: "Designer, rooted in Design",
    },
    // Line 3
    highlight2Text: {
      type: String,
      default: "Thinking",
    },
    highlight2Color: {
      type: String,
      default: "#f59e0b",
    },
    badge2Text: {
      type: String,
      default: "Wireframing",
    },
    badge2Color: {
      type: String,
      default: "#f59e0b",
    },
    titleLine3Middle: {
      type: String,
      default: "and a",
    },
    highlight3Text: {
      type: String,
      default: "passion",
    },
    highlight3Color: {
      type: String,
      default: "#ff3d00",
    },
    badge3Text: {
      type: String,
      default: "Visual Design",
    },
    badge3Color: {
      type: String,
      default: "#ff3d00",
    },
    titleLine3Suffix: {
      type: String,
      default: "for",
    },
    // Line 4
    highlight4Text: {
      type: String,
      default: "User-Centric",
    },
    highlight4Color: {
      type: String,
      default: "#ec4899",
    },
    badge4Text: {
      type: String,
      default: "User Research",
    },
    badge4Color: {
      type: String,
      default: "#ec4899",
    },
    highlight5Text: {
      type: String,
      default: "Solutions",
    },
    highlight5Color: {
      type: String,
      default: "#8b5cf6",
    },
    badge5Text: {
      type: String,
      default: "Prototype",
    },
    badge5Color: {
      type: String,
      default: "#8b5cf6",
    },
    // Subtitle & Subtitle Badge
    subtitle: {
      type: String,
      default:
        "Pyush Anand, crafting equitable and enjoyable user experiences, where usability meets delight.",
    },
    badge6Text: {
      type: String,
      default: "Design System",
    },
    badge6Color: {
      type: String,
      default: "#0070f3",
    },
    // Locations
    locations: {
      type: [String],
      default: ["Delhi", "Gurgaon", "Dubai", "UK", "US", "Noida"],
    },
  },
  { timestamps: true }
);

const Hero = mongoose.models.Hero || mongoose.model("Hero", heroSchema);
export default Hero;
