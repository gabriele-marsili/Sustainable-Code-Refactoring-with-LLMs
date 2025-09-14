function spiralTraversal(matrix) {
  if (!matrix?.length || !matrix[0]?.length || !isSquare(matrix)) return false;

  const rows = matrix.length;
  const cols = matrix[0].length;
  const totalElements = rows * cols;
  const result = new Array(totalElements);
  
  let top = 0, bottom = rows - 1;
  let left = 0, right = cols - 1;
  let index = 0;
  
  while (index < totalElements) {
    for (let col = left; col <= right && index < totalElements; col++) {
      result[index++] = matrix[top][col];
    }
    top++;
    
    for (let row = top; row <= bottom && index < totalElements; row++) {
      result[index++] = matrix[row][right];
    }
    right--;
    
    for (let col = right; col >= left && index < totalElements; col--) {
      result[index++] = matrix[bottom][col];
    }
    bottom--;
    
    for (let row = bottom; row >= top && index < totalElements; row--) {
      result[index++] = matrix[row][left];
    }
    left++;
  }
  
  return result;
}

function isSquare(matrix) {
  const firstRowLength = matrix[0].length;
  for (let i = 1; i < matrix.length; i++) {
    if (matrix[i].length !== firstRowLength) return false;
  }
  return true;
}

export default spiralTraversal;