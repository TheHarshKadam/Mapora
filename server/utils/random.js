export function getRandomIndex(length) {
  return Math.floor(Math.random() * length);
}

export function getRandomItem(array) {
  if (!array || array.length === 0) return null;

  const index = getRandomIndex(array.length);
  return array[index];
}