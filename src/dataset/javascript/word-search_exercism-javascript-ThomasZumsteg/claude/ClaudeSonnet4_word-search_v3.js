export default class WordSearch {
  constructor(grid) {
    this.grid = grid;
    this.rows = grid.length;
    this.cols = grid[0]?.length || 0;
  }

  find(words) {
    const result = Object.fromEntries(words.map(w => [w, undefined]));
    const foundWords = new Set();
    
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
    const directions = [
      [1, 1], [1, 0], [1, -1],
      [0, 1], [0, -1],
      [-1, 1], [-1, 0], [-1, -1]
    ];
    
    const wordLen = word.length;
    
    for (const [dr, dc] of directions) {
      const endRow = row + dr * (wordLen - 1);
      const endCol = col + dc * (wordLen - 1);
      
      if (endRow < 0 || endRow >= this.rows || endCol < 0 || endCol >= this.cols) {
        continue;
      }
      
      let match = true;
      for (let pos = 0; pos < wordLen; pos++) {
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