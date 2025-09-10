//@ts-check

const SCORES = [
  { radius: 1, score: 10 },
  { radius: 5, score: 5 },
  { radius: 10, score: 1 },
];

/**
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
export function score(x, y) {
  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    return null;
  }

  const radiusSquared = x * x + y * y;

  for (const { radius, score } of SCORES) {
    if (radiusSquared <= radius * radius) {
      return score;
    }
  }

  return 0;
}