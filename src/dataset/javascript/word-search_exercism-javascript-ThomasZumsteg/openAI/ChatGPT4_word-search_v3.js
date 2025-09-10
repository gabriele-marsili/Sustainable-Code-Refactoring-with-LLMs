export default class WordSearch {
  constructor(grid) {
    this.grid = grid;
  }

  find(words) {
    const result = Object.fromEntries(words.map(word => [word, undefined]));
    const rows = this.grid.length;
    const cols = this.grid[0].length;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        for (const word of words) {
          if (result[word] === undefined) {
            const end = this.search(word, r, c);
            if (end) {
              result[word] = { start: [r + 1, c + 1], end };
            }
          }
        }
      }
    }
    return result;
  }

  search(word, row, col) {
    const directions = [
      [1, 1], [1, 0], [1, -1],
      [0, 1], [0, -1],
      [-1, 1], [-1, 0], [-1, -1],
    ];
    const wordLength = word.length;
    const rows = this.grid.length;
    const cols = this.grid[0].length;

    for (const [dRow, dCol] of directions) {
      let r = row, c = col, pos = 0;

      while (
        pos < wordLength &&
        r >= 0 && r < rows &&
        c >= 0 && c < cols &&
        this.grid[r][c] === word[pos]
      ) {
        r += dRow;
        c += dCol;
        pos++;
      }

      if (pos === wordLength) {
        return [row + dRow * (wordLength - 1) + 1, col + dCol * (wordLength - 1) + 1];
      }
    }
  }
}