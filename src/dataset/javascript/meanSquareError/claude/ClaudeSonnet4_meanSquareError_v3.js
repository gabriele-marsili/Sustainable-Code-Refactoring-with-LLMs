var solution = function(firstArray, secondArray) {
  let sum = 0;
  
  for (let i = 0; i < firstArray.length; i++) {
    const diff = firstArray[i] - secondArray[i];
    sum += diff * diff;
  }
  
  return sum / firstArray.length;
}

export default solution;