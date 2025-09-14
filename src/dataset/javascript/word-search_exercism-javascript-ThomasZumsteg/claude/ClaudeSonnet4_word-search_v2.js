export default class WordSearch {
  constructor(grid) {
    this.grid = grid;
    this.rows = grid.length;
    this.cols = grid[0]?.length || 0;
    this.directions = [
      [1, 1], [1, 0], [1, -1],
      [0, 1], [0, -1],
      [-1, 1], [-1, 0], [-1, -1]
    ];
  }

  find(words) {
    const result = {};
    const foundWords = new Set();
    
    for (const word of words) {
      result[word] = undefined;
    }

    for (let r = 0; r < this.rows && foundWords.size < words.length; r++) {
      for (let c = 0; c < this.cols && foundWords.size < words.length; c++) {
        for (const word of words) {
          if (foundWords.has(word)) continue;
          
          const end = this.search(word, r, c);
          if (end) {
            result[word] = { start: [r + 1, c + 1], end };
            foundWords.add(word);
          }
        }
      }
    }
    return result;
  }

  search(word, row, col) {
    if (this.grid[row][col] !== word[0]) return undefined;
    
    for (const [dr, dc] of this.directions) {
      const endRow = row + dr * (word.length - 1);
      const endCol = col + dc * (word.length - 1);
      
      if (endRow < 0 || endRow >= this.rows || endCol < 0 || endCol >= this.cols) {
        continue;
      }
      
      let match = true;
      for (let i = 1; i < word.length; i++) {
        const r = row + dr * i;
        const c = col + dc * i;
        if (this.grid[r][c] !== word[i]) {
          match = false;
          break;
        }
      }
      
      if (match) {
        return [endRow + 1, endCol + 1];
      }
    }
    return undefined;
  }
}