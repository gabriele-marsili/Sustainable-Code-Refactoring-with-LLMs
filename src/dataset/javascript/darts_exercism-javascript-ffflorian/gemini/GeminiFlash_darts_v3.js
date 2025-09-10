//@ts-check

const outerCircle = 10;
const middleCircle = 5;
const innerCircle = 1;

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

  if (radiusSquared <= innerCircle * innerCircle) {
    return 10;
  }

  if (radiusSquared <= middleCircle * middleCircle) {
    return 5;
  }

  if (radiusSquared <= outerCircle * outerCircle) {
    return 1;
  }

  return 0;
}