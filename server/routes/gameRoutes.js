import express from "express";
import { startGame, makeGuess } from "../controllers/gameController.js";

const router = express.Router();

// Start new game
router.post("/start", startGame);

// Make guess
router.post("/guess", makeGuess);

export default router;