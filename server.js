import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import compression from "compression";
import multer from "multer";
import connectDB from "./config/db.js";
import { requireAdminForWrites } from "./middleware/adminAuth.js";
import { autoDeployOnAdminChange } from "./middleware/autoDeploy.js";
import { sanitizeRequest } from "./middleware/security.js";

import adminRoutes from "./routes/adminRoutes.js";
import userAuthRoutes from "./routes/userAuthRoutes.js";
import heroRoutes from "./routes/heroRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import footerRoutes from "./routes/footerRoutes.js";
import upload from "./middleware/multer.js";

const app = express();

app.disable("x-powered-by");

// CORS configuration
app.use(
  cors({
    origin(origin, callback) {
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "x-admin-api-key",
    ],
  })
);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(compression());

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(hpp({ checkQuery: false }));
app.use(sanitizeRequest);

// Connect DB
connectDB();

// API auth guard & auto-deploy for admin write access
app.use("/api", requireAdminForWrites);
app.use("/api", autoDeployOnAdminChange);

// API Routes
app.use("/api", adminRoutes);
app.use("/api", userAuthRoutes);
app.use("/api", heroRoutes);
app.use("/api", aboutRoutes);
app.use("/api", portfolioRoutes);
app.use("/api", resumeRoutes);
app.use("/api", companyRoutes);
app.use("/api", footerRoutes);

// File upload route
app.post("/api/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({ url: req.file.path });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get("/", (req, res) => {
  res.send("Pyush Anand Backend Server Running");
});

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ error: "File too large. Maximum upload size is 50 MB." });
    }
    return res.status(400).json({ error: err.message });
  }

  if (err.message?.startsWith("Invalid file type")) {
    return res.status(400).json({ error: err.message });
  }

  if (err.type === "entity.too.large") {
    return res.status(413).json({ error: "Request body too large." });
  }

  res.status(err.status || 500).json({
    error:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
