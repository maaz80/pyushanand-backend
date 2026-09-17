import mongoose from "mongoose";

const quickLinkSchema = new mongoose.Schema({
  category: {
    type: String,
    default: "Case Study",
  },
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    default: "#",
  },
});

const footerSchema = new mongoose.Schema(
  {
    watermarkText: {
      type: String,
      default: "Let's Collaborate",
    },
    logoUrl: {
      type: String,
      default: "/images/logo.webp",
    },
    hirePillText: {
      type: String,
      default: "Hire me :)",
    },
    headline: {
      type: String,
      default:
        "Let’s collaborate & craft more equitable and enjoyable user experiences.",
    },
    quickLinks: {
      type: [quickLinkSchema],
      default: [
        { category: "Banking", title: "Transforming Genie", link: "#project-genie" },
        { category: "Finance", title: "Personal Finance Management", link: "#project-finance" },
        { category: "Wellbeing", title: "Design Thinking & Innovation", link: "#project-bmcr" },
        { category: "Wellbeing", title: "Insijam", link: "#project-insijam" },
      ],
    },
    behanceUrl: {
      type: String,
      default: "https://www.behance.net/pyushanand",
    },
    dribbbleUrl: {
      type: String,
      default: "https://dribbble.com/pyushanand",
    },
    instagramUrl: {
      type: String,
      default: "#instagram",
    },
    linkedinUrl: {
      type: String,
      default: "https://www.linkedin.com/in/kalra/",
    },
    email: {
      type: String,
      default: "pyushanand2007@gmail.com",
    },
    phone: {
      type: String,
      default: "+91-8700671102",
    },
    downloadText: {
      type: String,
      default: "Download Resume",
    },
    downloadLink: {
      type: String,
      default: "#download-resume",
    },
  },
  { timestamps: true }
);

const Footer =
  mongoose.models.Footer || mongoose.model("Footer", footerSchema);

export default Footer;
