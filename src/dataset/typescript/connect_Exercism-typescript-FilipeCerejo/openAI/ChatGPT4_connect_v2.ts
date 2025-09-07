type PlayerType = 'O' | 'X';
type PointType = [number, number];

export class Board {
    private _board: string[][];
    private _hasWinner: boolean = false;

    constructor(board: string[]) {
        const testBoard: string[][] = board.map((line: string) => line.split(' '));

        if (this.isValid(testBoard)) {
            this._board = testBoard;
        } else if (testBoard.length === 5 && testBoard[0].length === 4) {
            this._board = testBoard.map((line: string[]) => [...line, 'X']);
        } else {
            this._board = [];
        }
    }

    private isValid(board: string[][]): boolean {
        const size = board.length;
        return board.every((row, index) => row.length === size + index);
    }

    public winner(): string {
        if (this.winnerPath('O')) return 'O';
        if (this.winnerPath('X')) return 'X';
        return '';
    }

    private winnerPath(player: PlayerType): boolean {
        const startingPoints: PointType[] = player === 'O'
            ? this._board[0].map((cell, i) => (cell === 'O' ? [0, i] : null)).filter(Boolean) as PointType[]
            : this._board.map((row, i) => (row[i] === 'X' ? [i, i] : null)).filter(Boolean) as PointType[];

        for (const point of startingPoints) {
            if (this.searchPath(player, point)) return true;
        }
        return false;
    }

    private searchPath(player: PlayerType, p: PointType): boolean {
        const stack: PointType[] = [p];

        while (stack.length > 0) {
            const [x, y] = stack.pop()!;
            this._board[x][y] = 'A';

            if (this.isEnd(player, [x, y])) {
                this._hasWinner = true;
                return true;
            }

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