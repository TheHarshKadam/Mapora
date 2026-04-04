import express from "express";
import { startGame, makeGuess, revealAnswer } from "../controllers/gameController.js";

const router = express.Router();

// Start new game
router.post("/start", startGame);

// Make guess
router.post("/guess", makeGuess);

router.post("/reveal", revealAnswer);

export default router;