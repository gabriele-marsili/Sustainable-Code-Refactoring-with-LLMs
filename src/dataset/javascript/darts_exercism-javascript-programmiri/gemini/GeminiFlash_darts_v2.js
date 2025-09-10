export function solve(x, y) {
  x = Number(x);
  y = Number(y);

  if (Number.isNaN(x) || Number.isNaN(y)) {
    return null;
  }

  const distanceSquared = x * x + y * y;

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