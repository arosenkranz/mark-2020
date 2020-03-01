export function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.random() * (max - min + 1) + min;
}

export function randomRange(startingValue) {
  const coinFlip = Math.round(Math.random());
  return coinFlip ? startingValue + 20 : startingValue - 20;
}
