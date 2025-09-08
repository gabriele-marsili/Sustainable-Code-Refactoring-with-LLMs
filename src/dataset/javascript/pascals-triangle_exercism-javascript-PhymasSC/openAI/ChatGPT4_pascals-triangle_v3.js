const factorial = (() => {
  const cache = [1];
  return number => {
    if (cache[number] !== undefined) return cache[number];
    for (let i = cache.length; i <= number; i++) {
      cache[i] = cache[i - 1] * i;
    }
    return cache[number];
  };
})();

const combination = (totalNumberOfObjects, numberOfCurrentObject) => {
  const r = Math.min(numberOfCurrentObject, totalNumberOfObjects - numberOfCurrentObject);
  let result = 1;
  for (let i = 0; i < r; i++) {
    result = (result * (totalNumberOfObjects - i)) / (i + 1);
  }
  return result;
};

export const rows = number => {
  if (number <= 0) return [];
  const res = [];
  for (let row = 0; row < number; row++) {
    const currentRow = [1];
    for (let column = 1; column <= row; column++) {
      currentRow.push(combination(row, column));
    }
    res.push(currentRow);
  }
  return res;
};