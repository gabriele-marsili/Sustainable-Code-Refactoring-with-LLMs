var solution = function(firstArray, secondArray) {
  const length = firstArray.length;
  let sum = 0;

  for (let i = 0; i < length; i++) {
    const diff = firstArray[i] - secondArray[i];
    sum += diff * diff;
  }

  return sum / length;
};

export default solution;