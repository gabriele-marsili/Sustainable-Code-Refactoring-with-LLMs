export function solve(x, y) {
  const nx = Number(x), ny = Number(y);
  if (Number.isNaN(nx) || Number.isNaN(ny)) return null;
  const distanceSquared = nx * nx + ny * ny;
  if (distanceSquared <= 1) return 10;
  if (distanceSquared <= 25) return 5;
  if (distanceSquared <= 100) return 1;
  return 0;
}