export default {
  ofSize(limit) {
    if (limit <= 0) return [];
    if (limit === 1) return [[1]];

    const result = Array.from({ length: limit }, () => new Array(limit));
    
    let top = 0, bottom = limit - 1, left = 0, right = limit - 1;
    let num = 1;

    while (top <= bottom && left <= right) {
      for (let col = left; col <= right; col++) {
        result[top][col] = num++;
      }
      top++;

      for (let row = top; row <= bottom; row++) {
        result[row][right] = num++;
      }
      right--;

      if (top <= bottom) {
        for (let col = right; col >= left; col--) {
          result[bottom][col] = num++;
        }
        bottom--;
      }

      if (left <= right) {
        for (let row = bottom; row >= top; row--) {
          result[row][left] = num++;
        }
        left++;
      }
    }

    return result;
  },
};