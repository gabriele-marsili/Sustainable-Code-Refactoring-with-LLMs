var solution = function(firstArray, secondArray) {
  let sumOfSquaredDiffs = 0;
  const length = firstArray.length;

  for (let i = 0; i < length; i++) {
    const diff = firstArray[i] - secondArray[i];
    sumOfSquaredDiffs += diff * diff;
  }

  return sumOfSquaredDiffs / length;
}

export default solution;