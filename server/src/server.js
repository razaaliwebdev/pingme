import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

// Routes

app.use("/api/auth", authRoutes);

app.use("/", (req, res) => {
  return res.send("<h1>API is working fine...</h1>");
});

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
