export const eggCount = (displayValue: number): number => {
  let count = 0;
  let value = displayValue;
  
  while (value > 0) {
    count += value & 1;
    value >>>= 1;
  }
  
  return count;
};