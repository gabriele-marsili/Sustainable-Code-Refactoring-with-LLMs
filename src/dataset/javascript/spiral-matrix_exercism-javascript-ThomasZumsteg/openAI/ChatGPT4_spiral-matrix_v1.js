export default {
  ofSize(limit) {
    const result = Array.from({ length: limit }, () => Array(limit));
    let row = 0, col = 0, dir = 0;
    const directions = [
      [0, 1],  // right
      [1, 0],  // down
      [0, -1], // left
      [-1, 0]  // up
    ];
    const bounds = { top: 0, bottom: limit - 1, left: 0, right: limit - 1 };

    for (let n = 1; n <= limit * limit; n++) {
      result[row][col] = n;

      const [dRow, dCol] = directions[dir];
      const nextRow = row + dRow, nextCol = col + dCol;

      if (
        nextRow > bounds.bottom || nextRow < bounds.top ||
        nextCol > bounds.right || nextCol < bounds.left ||
        result[nextRow][nextCol] !== undefined
      ) {
        if (dir === 0) bounds.top++;
        else if (dir === 1) bounds.right--;
        else if (dir === 2) bounds.bottom--;
        else if (dir === 3) bounds.left++;
        dir = (dir + 1) % 4;
      }

      row += directions[dir][0];
      col += directions[dir][1];
    }

    return result;
  },
};