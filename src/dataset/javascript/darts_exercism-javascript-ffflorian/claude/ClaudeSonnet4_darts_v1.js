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

  const radiusSquared = x * x + y * y;

  if (radiusSquared <= innerCircleSquared) {
    return 10;
  }

  if (radiusSquared <= middleCircleSquared) {
    return 5;
  }

  if (radiusSquared <= outerCircleSquared) {
    return 1;
  }

  return 0;
}