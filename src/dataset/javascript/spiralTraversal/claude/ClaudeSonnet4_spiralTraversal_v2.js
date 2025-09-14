function spiralTraversal(matrix) {
  if (!matrix?.length || !matrix[0]?.length) return false;
  
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
    // Right
    for (let j = left; j <= right; j++) {
      result[idx++] = matrix[top][j];
    }
    top++;
    
    // Down
    for (let i = top; i <= bottom; i++) {
      result[idx++] = matrix[i][right];
    }
    right--;
    
    // Left
    if (top <= bottom) {
      for (let j = right; j >= left; j--) {
        result[idx++] = matrix[bottom][j];
      }
      bottom--;
    }
    
    // Up
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        result[idx++] = matrix[i][left];
      }
      left++;
    }
  }
  
  return result;
}

export default spiralTraversal;