import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    sectionTitle: {
      type: String,
      default: "About",
    },
    primaryParagraph: {
      type: String,
      default:
        "I’m currently working as Principal Experience Designer @Designit - a Wipro Company, Bangalore, with 12 years of experience in sectors including Telecom, Banking, Media, E-commerce, and Healthcare. With a fervent commitment to Design Thinking and a User-Centric approach.",
    },
    ctaText: {
      type: String,
      default: "About me",
    },
    ctaLink: {
      type: String,
      default: "#about",
    },
    secondaryParagraph1: {
      type: String,
      default:
        "Over the past 12 years, I have the privilege of collaborating with great global brands like Cynergy Bank, YesBank, Etisalat, OLX, NDTV, V&A Museum and many more.",
    },
    secondaryParagraph2: {
      type: String,
      default:
        "My collaborative approach and passion for crafting exceptional user experiences make me a valuable asset to any project or team.",
    },
  },
  { timestamps: true }
);

const About = mongoose.models.About || mongoose.model("About", aboutSchema);
export default About;
