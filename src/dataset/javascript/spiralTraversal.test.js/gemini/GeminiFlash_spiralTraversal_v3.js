function spiralTraversal(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const linearArray = [];
  let top = 0, bottom = rows - 1, left = 0, right = cols - 1;
  let dir = 0; // 0: right, 1: down, 2: left, 3: up

  while (top <= bottom && left <= right) {
    if (dir === 0) {
      for (let i = left; i <= right; i++) {
        linearArray.push(matrix[top][i]);
      }
      top++;
    } else if (dir === 1) {
      for (let i = top; i <= bottom; i++) {
        linearArray.push(matrix[i][right]);
      }
      right--;
    } else if (dir === 2) {
      for (let i = right; i >= left; i--) {
        linearArray.push(matrix[bottom][i]);
      }
      bottom--;
    } else if (dir === 3) {
      for (let i = bottom; i >= top; i--) {
        linearArray.push(matrix[i][left]);
      }
      left++;
    }
    dir = (dir + 1) % 4;
  }

  return linearArray;
}

function isSquare(matrix) {
  if (!matrix || matrix.length === 0) return true;

  const rowLength = matrix[0].length;
  for (let i = 1; i < matrix.length; i++) {
    if (matrix[i].length !== rowLength) {
      return false;
    }
  }
  return true;
}

export default spiralTraversal;