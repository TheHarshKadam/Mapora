import { evaluateGuess } from "../services/gameEngine.js";
import { getRandomItem } from "../utils/random.js";
import fs from "fs";

const countries = JSON.parse(
  fs.readFileSync(new URL("../data/countries.json", import.meta.url))
);

let currentGame = {
  target: null,
  guesses: [],
  startTime: null,
};

//Start Game
export const startGame = (req, res) => {
  currentGame = {
    target: getRandomItem(countries),
    guesses: [],
    startTime: Date.now(),
  };

  return res.json({
    message: "Game started",
    gameStarted: true,
    guesses: [], 
  });
};

//Reveal Answer
export const revealAnswer = (req, res) => {
  if (!currentGame.target) {
    return res.status(400).json({ message: "Game not started" });
  }

  const timeTaken = Math.floor(
    (Date.now() - currentGame.startTime) / 1000
  );

  return res.json({
    gameOver: true,
    revealed: true,
    answer: currentGame.target.name,
    guesses: currentGame.guesses,
    stats: {
      totalGuesses: currentGame.guesses.length,
      timeTaken,
      closestDistance:
        currentGame.guesses.length > 0
          ? Math.min(...currentGame.guesses.map(g => g.distance))
          : null,
    },
  });
};

//Make Guess
export const makeGuess = (req, res) => {
  const { countryName } = req.body;

  if (!currentGame.target) {
    return res.status(400).json({ message: "Game not started yet" });
  }

  if (!countryName) {
    return res.status(400).json({ message: "Country name is required" });
  }

  const guess = countries.find(
    (c) => c.name.toLowerCase() === countryName.toLowerCase()
  );

  if (!guess) {
    return res.status(400).json({ message: "Invalid country name" });
  }

  const alreadyGuessed = currentGame.guesses.find(
    (g) => g.name.toLowerCase() === guess.name.toLowerCase()
  );

  if (alreadyGuessed) {
    return res.status(400).json({ message: "Country already guessed" });
  }

  const previousGuess = currentGame.guesses.slice(-1)[0];

  const result = evaluateGuess({
    guess,
    previousGuess,
    target: currentGame.target,
    guesses: currentGame.guesses,
  });

  //SAVE COLOR ALSO
  currentGame.guesses.push({
    name: guess.name,
    lat: guess.lat,
    lng: guess.lng,
    distance: result.distance,
    color: result.color,
  });

  //Game Over
  if (result.correct) {
    const timeTaken = Math.floor(
      (Date.now() - currentGame.startTime) / 1000
    );

    return res.json({
      ...result,
      gameOver: true,
      guesses: currentGame.guesses,
      stats: {
        totalGuesses: currentGame.guesses.length,
        timeTaken,
        closestDistance: result.closestDistance,
      },
    });
  }

  

  //Normal response
  return res.json({
    ...result,
    gameOver: false,
    guesses: currentGame.guesses,
  });
};