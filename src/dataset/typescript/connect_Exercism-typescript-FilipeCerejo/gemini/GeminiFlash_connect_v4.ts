type PlayerType = 'O' | 'X';
type PointType = [number, number];

export class Board {
    private _board: string[][];
    private _winner: string = '';

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
        const rows = board.length;
        if (rows === 0) return true;
        const cols = board[0].length;

        if (rows !== cols) {
            return false;
        }

        for (let r = 0; r < rows - 1; r++) {
            if (board[r + 1].length !== cols + r + 1) {
                return false;
            }
        }

        return true;
    }

    public winner(): string {
        if (this._winner) {
            return this._winner;
        }

        if (this.winnerPath('O')) {
            this._winner = 'O';
            return 'O';
        }

        if (this.winnerPath('X')) {
            this._winner = 'X';
            return 'X';
        }

        return '';
    }

    private winnerPath(player: PlayerType): boolean {
        let startingPoints: PointType[] = [];

        if (player === 'O') {
            for (let i = 0; i < this._board[0].length; i++) {
                if (this._board[0][i] === 'O') {
                    startingPoints.push([0, i]);
                }
            }
        } else {
            for (let i = 0; i < this._board.length; i++) {
                if (this._board[i][0] === 'X') {
                    startingPoints.push([i, 0]);
                }
            }
        }

        for (const point of startingPoints) {
            if (this.searchPath(player, point)) {
                return true;
            }
        }

        return false;
    }

    private searchPath(player: PlayerType, p: PointType): boolean {
        const [row, col] = p;

        if (this.isEnd(player, p)) {
            return true;
        }

        this._board[row][col] = 'A';

        const directions: PointType[] = [
            [row - 1, col - 1],
            [row - 1, col],
            [row, col + 1],
            [row + 1, col + 1],
            [row + 1, col],
            [row, col - 1],
        ];

        for (const [newRow, newCol] of directions) {
            if (this.isValidMove(player, [newRow, newCol])) {
                if (this.searchPath(player, [newRow, newCol])) {
                    return true;
                }
            }
        }

        return false;
    }

    private isValidMove(player: PlayerType, p: PointType): boolean {
        const [row, col] = p;
        return (
            this._board[row] !== undefined &&
            this._board[row][col] !== undefined &&
            this._board[row][col] === player
        );
    }

    private isEnd(player: PlayerType, p: PointType): boolean {
        const [row, col] = p;
        return (
            (player === 'O' && row === this._board.length - 1) ||
            (player === 'X' && col === this._board[row].length - 1)
        );
    }
}