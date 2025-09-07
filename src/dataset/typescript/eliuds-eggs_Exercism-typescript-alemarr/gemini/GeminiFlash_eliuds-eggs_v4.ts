export const eggCount = (displayValue: number): number => {
  let count = 0;
  let num = displayValue;

  while (num > 0) {
    count += num % 2;
    num = Math.floor(num / 2);
  }

  return count;
};