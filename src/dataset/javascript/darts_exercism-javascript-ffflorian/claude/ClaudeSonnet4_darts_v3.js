//@ts-check

const OUTER_CIRCLE_SQUARED = 100;
const MIDDLE_CIRCLE_SQUARED = 25;
const INNER_CIRCLE_SQUARED = 1;

/**
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
export function score(x, y) {
  if (typeof x !== 'number' || typeof y !== 'number') {
    return null;
  }

  const radiusSquared = x * x + y * y;

  if (radiusSquared <= INNER_CIRCLE_SQUARED) {
    return 10;
  }

  if (radiusSquared <= MIDDLE_CIRCLE_SQUARED) {
    return 5;
  }

  if (radiusSquared <= OUTER_CIRCLE_SQUARED) {
    return 1;
  }

  return 0;
}