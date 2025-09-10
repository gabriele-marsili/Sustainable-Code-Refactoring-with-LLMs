export function solve(x, y) {
  const numX = Number(x);
  const numY = Number(y);

  if (Number.isNaN(numX) || Number.isNaN(numY)) {
    return null;
  }

  const distanceSquared = numX * numX + numY * numY;

  if (distanceSquared <= 1) {
    return 10;
  }

  if (distanceSquared <= 25) {
    return 5;
  }

  if (distanceSquared <= 100) {
    return 1;
  }

  return 0;
}