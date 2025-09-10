export default class Minesweeper {
  annotate(board: string[]): string[] {
    const mineCell = '*';
    const rows = board.length;
    const cols = board[0]?.length || 0;
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1], [1, 0], [1, 1],
    ];

    return board.map((row, rowIdx) =>
      row.split('').map((cell, colIdx) => {
        if (cell === mineCell) return mineCell;
        let cellValue = 0;
        for (const [dr, dc] of directions) {
          const r = rowIdx + dr, c = colIdx + dc;
          if (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === mineCell) {
            cellValue++;
          }
        }
        return cellValue === 0 ? ' ' : cellValue.toString();
      }).join('')
    );
  }
}