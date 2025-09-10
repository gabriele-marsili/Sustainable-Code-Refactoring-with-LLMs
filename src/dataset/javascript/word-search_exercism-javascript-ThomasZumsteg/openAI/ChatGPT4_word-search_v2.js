export default class WordSearch {
  constructor(grid) {
    this.grid = grid;
    this.rows = grid.length;
    this.cols = grid[0].length;
    this.directions = [
      { row: 1, col: 1 },
      { row: 1, col: 0 },
      { row: 1, col: -1 },
      { row: 0, col: 1 },
      { row: 0, col: -1 },
      { row: -1, col: 1 },
      { row: -1, col: 0 },
      { row: -1, col: -1 },
    ];
  }

  find(words) {
    const result = {};
    const wordSet = new Set(words);

    for (const word of wordSet) {
      result[word] = undefined;
    }

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        for (const word of wordSet) {
          if (result[word] === undefined && this.grid[r][c] === word[0]) {
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
    for (const { row: dRow, col: dCol } of this.directions) {
      let r = row, c = col, pos = 0;

      while (
        pos < word.length &&
        r >= 0 && r < this.rows &&
        c >= 0 && c < this.cols &&
        this.grid[r][c] === word[pos]
      ) {
        r += dRow;
        c += dCol;
        pos++;
      }

      if (pos === word.length) {
        return [row + dRow * (word.length - 1) + 1, col + dCol * (word.length - 1) + 1];
      }
    }
  }
}