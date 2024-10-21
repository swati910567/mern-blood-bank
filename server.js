import express from "express";
import testRoutes from "./routes/testRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import dotenv from "dotenv";
import colors from "colors";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

//mongodb connection
connectDB();

const app = express();
//port

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const PORT = process.env.PORT || 8080;

//Static Folder
app.use(express.static(path.join(__dirname, "./client/build")));

//Static routes
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//routes

app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/inventory", inventoryRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/admin", adminRoutes);

//listen
app.listen(PORT, () => {
  console.log(`Node Server running on port ${process.env.PORT}`);
});
