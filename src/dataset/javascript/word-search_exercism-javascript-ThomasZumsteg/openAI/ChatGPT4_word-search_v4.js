export default class WordSearch {
  constructor(grid) {
    this.grid = grid;
  }

  find(words) {
    const result = {};
    const rows = this.grid.length;
    const cols = this.grid[0].length;
    const directions = [
      [1, 1], [1, 0], [1, -1], [0, 1],
      [0, -1], [-1, 1], [-1, 0], [-1, -1],
    ];

    for (const word of words) {
      result[word] = undefined;
      outer: for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          for (const [dr, dc] of directions) {
            if (this.checkWord(word, r, c, dr, dc)) {
              result[word] = {
                start: [r + 1, c + 1],
                end: [r + dr * (word.length - 1) + 1, c + dc * (word.length - 1) + 1],
              };
              break outer;
            }
          }
        }
      }
    }
    return result;
  }

  checkWord(word, row, col, dr, dc) {
    const rows = this.grid.length;
    const cols = this.grid[0].length;

    for (let i = 0; i < word.length; i++) {
      const r = row + dr * i;
      const c = col + dc * i;
      if (r < 0 || r >= rows || c < 0 || c >= cols || this.grid[r][c] !== word[i]) {
        return false;
      }
    }
    return true;
  }
}