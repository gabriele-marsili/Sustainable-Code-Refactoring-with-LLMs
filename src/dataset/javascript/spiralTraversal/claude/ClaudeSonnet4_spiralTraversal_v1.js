function spiralTraversal(matrix) {
  if (!matrix.length || !matrix[0].length) return false;
  
  const rows = matrix.length;
  const cols = matrix[0].length;
  
  // Check if all rows have same length
  for (let i = 1; i < rows; i++) {
    if (matrix[i].length !== cols) return false;
  }

  const result = new Array(rows * cols);
  let idx = 0;
  
  let top = 0, bottom = rows - 1;
  let left = 0, right = cols - 1;
  
  while (top <= bottom && left <= right) {
    // Traverse right
    for (let j = left; j <= right; j++) {
      result[idx++] = matrix[top][j];
    }
    top++;
    
    // Traverse down
    for (let i = top; i <= bottom; i++) {
      result[idx++] = matrix[i][right];
    }
    right--;
    
    // Traverse left (if we still have rows)
    if (top <= bottom) {
      for (let j = right; j >= left; j--) {
        result[idx++] = matrix[bottom][j];
      }
      bottom--;
    }
    
    // Traverse up (if we still have columns)
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        result[idx++] = matrix[i][left];
      }
      left++;
    }
  }
  
  return result;
}

function isSquare(matrix) {
  if (!matrix.length) return false;
  const size = matrix[0].length;
  for (let i = 1; i < matrix.length; i++) {
    if (matrix[i].length !== size) return false;
  }
  return true;
}

export default spiralTraversal;