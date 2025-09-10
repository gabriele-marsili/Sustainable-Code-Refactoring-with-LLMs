export default class WordSearch {
  constructor(grid) {
    this.grid = grid;
    this.rows = grid.length;
    this.cols = grid[0]?.length || 0; // Handle potentially empty grids
  }

  find(words) {
    const result = {};
    for (const word of words) {
      result[word] = undefined;
    }

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        for (const word of words) {
          if (result[word] === undefined && this.grid[r][c] === word[0]) { // Early check for first letter
            const end = this.search(word, r, c);
            if (end) {
              result[word] = { "start": [r + 1, c + 1], "end": end };
            }
          }
        }
      }
    }
    return result;
  }

  search(word, row, col) {
    const diffs = [
      { "row": 1, "col": 1 },
      { "row": 1, "col": 0 },
      { "row": 1, "col": -1 },
      { "row": 0, "col": 1 },
      { "row": 0, "col": -1 },
      { "row": -1, "col": 1 },
      { "row": -1, "col": 0 },
      { "row": -1, "col": -1 },
    ];
    const wordLength = word.length;

    for (const diff of diffs) {
      let valid = true;
      for (let pos = 0; pos < wordLength; pos++) {
        const newRow = row + diff.row * pos;
        const newCol = col + diff.col * pos;

        if (newRow < 0 || newRow >= this.rows || newCol < 0 || newCol >= this.cols || this.grid[newRow][newCol] !== word[pos]) {
          valid = false;
          break;
        }
      }

      if (valid) {
        return [row + diff.row * (wordLength - 1) + 1, col + diff.col * (wordLength - 1) + 1];
      }
    }

    return undefined;
  }
}