import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import path from "path";

import dotenv from "dotenv";
dotenv.config();

const app = express();

const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

// API Routes
app.use("/api/auth", authRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  return res.json({ status: "API is working fine..." });
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  // Serve static files
  app.use(express.static(path.join(__dirname, "../client/dist")));

  // Handle SPA routing - must be the last route
  app.get(/^[^.]*$/, (_, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

// Database connection
connectDb()
  .then(() => {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server is running on the PORT:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Failed...", error);
  });
