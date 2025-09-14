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
    const wordSet = new Set(words);
    
    for (const word of words) {
      result[word] = undefined;
    }

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const firstChar = this.grid[r][c];
        
        for (const word of wordSet) {
          if (word[0] === firstChar && !result[word]) {
            const end = this.search(word, r, c);
            if (end) {
              result[word] = { start: [r + 1, c + 1], end };
              wordSet.delete(word);
            }
          }
        }
        
        if (wordSet.size === 0) break;
      }
      if (wordSet.size === 0) break;
    }
    
    return result;
  }

  search(word, row, col) {
    const wordLength = word.length;
    
    for (const [dr, dc] of this.directions) {
      const endRow = row + dr * (wordLength - 1);
      const endCol = col + dc * (wordLength - 1);
      
      if (endRow < 0 || endRow >= this.rows || endCol < 0 || endCol >= this.cols) {
        continue;
      }
      
      let match = true;
      for (let pos = 0; pos < wordLength; pos++) {
        const currentRow = row + dr * pos;
        const currentCol = col + dc * pos;
        
        if (this.grid[currentRow][currentCol] !== word[pos]) {
          match = false;
          break;
        }
      }
      
      if (match) {
        return [endRow + 1, endCol + 1];
      }
    }
  }
}