import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/task.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(
  cors({
    origin: true, // allow all origins dynamically
    credentials: true, // allow cookies
  })
);

app.use(express.json());

// Database
connectDB();

// Routes
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Student Task Manager API running" });
});
app.use("/api/tasks", taskRoutes);

// Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
