import countries from "../data/countries.json" assert { type: "json" };
import { evaluateGuess } from "../services/gameEngine.js";
import { getRandomItem } from "../utils/random.js";

// Temporary in-memory game
let currentGame = {
  target: null,
  guesses: [],
  startTime: null,
};

// 🎮 Start New Game
export const startGame = (req, res) => {
  currentGame = {
    target: getRandomItem(countries),
    guesses: [],
    startTime: Date.now(),
  };

  return res.json({
    message: "Game started",
    gameStarted: true,
    guess: [],
  });
};

// 🎯 Make Guess
export const makeGuess = (req, res) => {
  const { countryName } = req.body;

  // ❗ Check if game started
  if (!currentGame.target) {
    return res.status(400).json({ message: "Game not started yet" });
  }

  if (!countryName) {
    return res.status(400).json({ message: "Country name is required" });
  }

  // 🔍 Find country
  const guess = countries.find(
    (c) => c.name.toLowerCase() === countryName.toLowerCase()
  );

  if (!guess) {
    return res.status(400).json({ message: "Invalid country name" });
  }

  // ❗ Duplicate check
  const alreadyGuessed = currentGame.guesses.find(
    (g) => g.name.toLowerCase() === guess.name.toLowerCase()
  );

  if (alreadyGuessed) {
    return res.status(400).json({ message: "Country already guessed" });
  }

  const previousGuess = currentGame.guesses.slice(-1)[0];

  // 🧠 Game logic
  const result = evaluateGuess({
    guess,
    previousGuess,
    target: currentGame.target,
    guesses: currentGame.guesses,
  });

  // 💾 Save guess
  currentGame.guesses.push({
    name: guess.name,
    lat: guess.lat,
    lng: guess.lng,
    distance: result.distance,
  });

  // 🎉 If correct
  if (result.correct) {
    const timeTaken = Math.floor(
      (Date.now() - currentGame.startTime) / 1000
    );

    return res.json({
      ...result,
      gameOver: true,
      stats: {
        totalGuesses: currentGame.guesses.length,
        timeTaken,
        closestDistance: result.closestDistance,
      },
    });
  }

  // 🔁 Normal response
  return res.json({
    ...result,
    gameOver: false,
  });
};