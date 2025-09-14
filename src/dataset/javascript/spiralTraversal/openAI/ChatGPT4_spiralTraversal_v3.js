function spiralTraversal(matrix) {
  if (!isSquare(matrix)) return false;

  const linearArray = [];
  let yMin = 0, xMin = 0;
  let xMax = matrix.length - 1, yMax = matrix[0].length - 1;

  while (yMin <= yMax && xMin <= xMax) {
    for (let y = yMin; y <= yMax; y++) linearArray.push(matrix[xMin][y]);
    xMin++;
    for (let x = xMin; x <= xMax; x++) linearArray.push(matrix[x][yMax]);
    yMax--;
    if (xMin <= xMax) {
      for (let y = yMax; y >= yMin; y--) linearArray.push(matrix[xMax][y]);
      xMax--;
    }
    if (yMin <= yMax) {
      for (let x = xMax; x >= xMin; x--) linearArray.push(matrix[x][yMin]);
      yMin++;
    }
  }

  return linearArray;
}

function isSquare(matrix) {
  const size = matrix[0].length;
  return matrix.every(row => row.length === size);
}

export default spiralTraversal;