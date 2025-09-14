export default class WordSearch {
  constructor(grid) {
    this.grid = grid;
    this.rows = grid.length;
    this.cols = grid[0]?.length || 0;
  }

  find(words) {
    const result = {};
    const foundWords = new Set();
    
    // Pre-initialize result object
    for (const word of words) {
      result[word] = undefined;
    }
    
    for (let r = 0; r < this.rows && foundWords.size < words.length; r++) {
      for (let c = 0; c < this.cols && foundWords.size < words.length; c++) {
        for (const word of words) {
          if (foundWords.has(word)) continue;
          
          const end = this.search(word, r, c);
          if (end !== undefined) {
            result[word] = {"start": [r + 1, c + 1], "end": end};
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
    
    const wordLength = word.length;
    
    for (const [rowDir, colDir] of directions) {
      let r = row;
      let c = col;
      let pos = 0;
      
      while (pos < wordLength && 
             r >= 0 && r < this.rows && 
             c >= 0 && c < this.cols && 
             this.grid[r][c] === word[pos]) {
        pos++;
        r += rowDir;
        c += colDir;
      }
      
      if (pos === wordLength) {
        return [row + rowDir * (wordLength - 1) + 1,
                col + colDir * (wordLength - 1) + 1];
      }
    }
    
    return undefined;
  }
}