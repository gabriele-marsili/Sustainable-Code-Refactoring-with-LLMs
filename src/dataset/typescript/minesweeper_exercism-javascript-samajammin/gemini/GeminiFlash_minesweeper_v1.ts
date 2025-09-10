export default class Minesweeper {
  annotate(board: string[]): string[] {
    const rows = board.length;
    if (rows === 0) {
      return [];
    }
    const cols = board[0].length;
    const annotatedBoard: string[] = new Array(rows);

    for (let i = 0; i < rows; i++) {
      annotatedBoard[i] = '';
      for (let j = 0; j < cols; j++) {
        if (board[i][j] === '*') {
          annotatedBoard[i] += '*';
        } else {
          let mineCount = 0;
          for (let x = Math.max(0, i - 1); x <= Math.min(rows - 1, i + 1); x++) {
            for (let y = Math.max(0, j - 1); y <= Math.min(cols - 1, j + 1); y++) {
              if (x === i && y === j) continue;
              if (board[x] && board[x][y] === '*') {
                mineCount++;
              }
            }
          }
          annotatedBoard[i] += mineCount === 0 ? ' ' : mineCount.toString();
        }
      }
    }

    return annotatedBoard;
  }
}