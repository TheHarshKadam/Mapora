import express from "express"
import cors from "cors"
import gameRoutes from "./routes/gameRoutes.js";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

app.use("/api/game", gameRoutes);

export default app;