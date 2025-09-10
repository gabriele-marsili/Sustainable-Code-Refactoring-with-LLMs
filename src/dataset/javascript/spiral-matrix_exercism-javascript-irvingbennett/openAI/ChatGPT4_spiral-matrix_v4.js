export class SpiralMatrix {
  static ofSize(n) {
    if (n === 0) return [];

    const matrix = Array.from({ length: n }, () => Array(n).fill(0));
    let value = 1, top = 0, bottom = n - 1, left = 0, right = n - 1;

    while (top <= bottom && left <= right) {
      for (let i = left; i <= right; i++) matrix[top][i] = value++;
      top++;
      for (let i = top; i <= bottom; i++) matrix[i][right] = value++;
      right--;
      if (top <= bottom) {
        for (let i = right; i >= left; i--) matrix[bottom][i] = value++;
        bottom--;
      }
      if (left <= right) {
        for (let i = bottom; i >= top; i--) matrix[i][left] = value++;
        left++;
      }
    }

    return matrix;
  }
}