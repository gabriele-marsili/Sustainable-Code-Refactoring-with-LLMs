export const eggCount = (displayValue: number): number => {
  let count = 0;
  while (displayValue > 0) {
    count += displayValue % 2;
    displayValue = Math.floor(displayValue / 2);
  }
  return count;
};