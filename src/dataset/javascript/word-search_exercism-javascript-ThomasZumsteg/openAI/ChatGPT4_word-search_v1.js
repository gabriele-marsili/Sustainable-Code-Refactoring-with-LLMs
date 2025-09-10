export default class WordSearch {
  constructor(grid) {
    this.grid = grid;
    this.diffs = [
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
    const gridHeight = this.grid.length;
    const gridWidth = this.grid[0]?.length || 0;

    for (const word of words) {
      result[word] = undefined;
      const wordLength = word.length;

      outer: for (let r = 0; r < gridHeight; r++) {
        for (let c = 0; c < gridWidth; c++) {
          const end = this.search(word, r, c, wordLength, gridHeight, gridWidth);
          if (end) {
            result[word] = { start: [r + 1, c + 1], end };
            break outer;
          }
        }
      }
    }

    return result;
  }

  search(word, row, col, wordLength, gridHeight, gridWidth) {
    for (const { row: dRow, col: dCol } of this.diffs) {
      let r = row, c = col, pos = 0;

      while (
        pos < wordLength &&
        r >= 0 && r < gridHeight &&
        c >= 0 && c < gridWidth &&
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