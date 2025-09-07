type PlayerType = 'O' | 'X';
type PointType = [number, number];

export class Board {
    private _board: string[][];
    private _hasWinner: boolean = false;

    constructor(board: string[]) {
        const testBoard = board.map((line) => line.split(' '));
        this._board = this.isValid(testBoard)
            ? testBoard
            : testBoard.length === 5 && testBoard[0].length === 4
            ? testBoard.map((line) => [...line, 'X'])
            : [];
    }

    private isValid(board: string[][]): boolean {
        const size = board.length;
        return board.every((row, i) => row.length === size + i);
    }

    public winner(): string {
        return this.winnerPath('O') ? 'O' : this.winnerPath('X') ? 'X' : '';
    }

    private winnerPath(player: PlayerType): boolean {
        const startingPoints: PointType[] = player === 'O'
            ? this._board[0].map((cell, i) => (cell === 'O' ? [0, i] : null)).filter(Boolean) as PointType[]
            : this._board.map((row, i) => (row[i] === 'X' ? [i, i] : null)).filter(Boolean) as PointType[];

        return startingPoints.some((point) => this.searchPath(player, point));
    }

    private searchPath(player: PlayerType, p: PointType): boolean {
        const stack: PointType[] = [p];
        while (stack.length) {
            const [x, y] = stack.pop()!;
            if (this.isEnd(player, [x, y])) {
                this._hasWinner = true;
                return true;
            }
            this._board[x][y] = 'A';

            const directions: PointType[] = [
                [x - 1, y - 1], [x - 1, y], [x, y + 1],
                [x + 1, y + 1], [x + 1, y], [x, y - 1]
            ];

            for (const [nx, ny] of directions) {
                if (this.isValidMove(player, [nx, ny])) {
                    stack.push([nx, ny]);
                }
            }
        }
        return false;
    }

    private isValidMove(player: PlayerType, [x, y]: PointType): boolean {
        return this._board[x]?.[y] === player;
    }

    private isEnd(player: PlayerType, [x, y]: PointType): boolean {
        return player === 'O' ? x === this._board.length - 1 : y === this._board[x].length - 1;
    }
}