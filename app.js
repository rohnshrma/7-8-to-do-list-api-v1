import express from "express";
import morgan from "morgan";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(morgan("dev"));
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => console.log("APP RUNNING ON PORT", PORT));
