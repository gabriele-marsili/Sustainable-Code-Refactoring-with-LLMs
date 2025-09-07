export const eggCount = (displayValue: number): number => {
  let count = 0;
  let num = displayValue;
  
  while (num > 0) {
    count += num & 1;
    num >>>= 1;
  }
  
  return count;
};