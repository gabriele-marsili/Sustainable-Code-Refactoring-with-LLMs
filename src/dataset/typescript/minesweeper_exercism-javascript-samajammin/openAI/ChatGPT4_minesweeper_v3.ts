export default class Minesweeper {
  annotate(board: string[]): string[] {
    const mineCell = '*';
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1], [1, 0], [1, 1],
    ];

    return board.map((row, rowIdx) =>
      row.split('').map((cell, colIdx) => {
        if (cell === mineCell) return mineCell;

        const cellValue = directions.reduce((count, [dx, dy]) => {
          const r = rowIdx + dx, c = colIdx + dy;
          return count + (board[r]?.[c] === mineCell ? 1 : 0);
        }, 0);

        return cellValue === 0 ? ' ' : cellValue.toString();
      }).join('')
    );
  }
}