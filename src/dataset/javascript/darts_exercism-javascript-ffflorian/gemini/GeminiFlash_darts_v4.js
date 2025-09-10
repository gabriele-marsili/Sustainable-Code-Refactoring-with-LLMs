//@ts-check

const outerCircleSquared = 100;
const middleCircleSquared = 25;
const innerCircleSquared = 1;

/**
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
export function score(x, y) {
  if (typeof x !== 'number' || typeof y !== 'number') {
    return null;
  }

  const squaredRadius = x * x + y * y;

  if (squaredRadius <= innerCircleSquared) {
    return 10;
  }

  if (squaredRadius <= middleCircleSquared) {
    return 5;
  }

  if (squaredRadius <= outerCircleSquared) {
    return 1;
  }

  return 0;
}