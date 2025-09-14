export function solve(x, y) {
  if (x !== x || y !== y) return null;
  const distanceSquared = x * x + y * y;
  if (distanceSquared <= 1) return 10;
  if (distanceSquared <= 25) return 5;
  if (distanceSquared <= 100) return 1;
  return 0;
}