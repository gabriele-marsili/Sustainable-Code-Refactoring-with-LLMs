export class SpiralMatrix {
  static ofSize(n) {
    if (n <= 0) {
      return [];
    }

    const matrix = Array(n).fill(null).map(() => Array(n));
    let num = 1;
    let top = 0, bottom = n - 1, left = 0, right = n - 1;
    let dir = 0; // 0: right, 1: down, 2: left, 3: up

    while (top <= bottom && left <= right) {
      if (dir === 0) {
        for (let i = left; i <= right; i++) {
          matrix[top][i] = num++;
        }
        top++;
      } else if (dir === 1) {
        for (let i = top; i <= bottom; i++) {
          matrix[i][right] = num++;
        }
        right--;
      } else if (dir === 2) {
        for (let i = right; i >= left; i--) {
          matrix[bottom][i] = num++;
        }
        bottom--;
      } else if (dir === 3) {
        for (let i = bottom; i >= top; i--) {
          matrix[i][left] = num++;
        }
        left++;
      }
      dir = (dir + 1) % 4;
    }

    return matrix;
  }
}