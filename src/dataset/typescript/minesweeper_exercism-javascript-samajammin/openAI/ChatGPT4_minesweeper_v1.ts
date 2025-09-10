export default class Minesweeper {
  annotate(board: string[]): string[] {
    const mineCell = '*';
    const rows = board.length;
    const cols = board[0]?.length || 0;

    return board.map((row, rowIdx) =>
      row.replace(/./g, (cell, colIdx) => {
        if (cell === mineCell) return mineCell;

        let cellValue = 0;
        for (let r = Math.max(0, rowIdx - 1); r <= Math.min(rows - 1, rowIdx + 1); r++) {
          for (let c = Math.max(0, colIdx - 1); c <= Math.min(cols - 1, colIdx + 1); c++) {
            if (board[r][c] === mineCell) cellValue++;
          }
        }
        return cellValue === 0 ? ' ' : cellValue.toString();
      })
    );
  }
}