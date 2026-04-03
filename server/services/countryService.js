import countries from "../data/countries.json" assert { type: "json" };

export function findCountryByName(name) {
  return countries.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
}

export function isValidCountry(name) {
  return !!findCountryByName(name);
}

export function getRandomCountry() {
  const index = Math.floor(Math.random() * countries.length);
  return countries[index];
}

export function isDuplicateGuess(guesses, name) {
  return guesses.some(
    (g) => g.name.toLowerCase() === name.toLowerCase()
  );
}