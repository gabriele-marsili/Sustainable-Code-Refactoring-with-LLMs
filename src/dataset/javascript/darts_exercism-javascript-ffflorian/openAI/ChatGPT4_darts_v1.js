//@ts-check

const outerCircle = 10;
const middleCircle = 5;
const innerCircle = 1;
const innerCircleScore = 10;
const middleCircleScore = 5;
const outerCircleScore = 1;

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

  if (radiusSquared <= innerCircle * innerCircle) {
    return innerCircleScore;
  }

  if (radiusSquared <= middleCircle * middleCircle) {
    return middleCircleScore;
  }

  if (radiusSquared <= outerCircle * outerCircle) {
    return outerCircleScore;
  }

  return 0;
}