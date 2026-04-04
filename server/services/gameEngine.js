import { getDistance } from "../utils/distance.js";
import { getColor } from "../utils/color.js";

export function evaluateGuess({ guess, previousGuess, target, guesses }) {
  const distance = getDistance(
    guess.lat,
    guess.lng,
    target.lat,
    target.lng
  );

  let warmth = null;

  if (previousGuess) {
    const prevDistance = getDistance(
      previousGuess.lat,
      previousGuess.lng,
      target.lat,
      target.lng
    );

    warmth = distance < prevDistance ? "warmer" : "colder";
  }


  const isAdjacent = guess.neighbors?.includes(target.name);

  const updatedGuesses = [...guesses, { ...guess, distance }].sort(
    (a, b) => a.distance - b.distance
  );

  return {
    distance: Math.round(distance),
    warmth,
    isAdjacent,
    color: getColor(distance), 
    closest: updatedGuesses.slice(0, 3),
    closestDistance: Math.round(updatedGuesses[0].distance),
    correct: distance < 1, 
  };
}