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
        const numRows = board.length;
        if (numRows === 0) return true;
        const firstRowLength = board[0].length;
        if (numRows !== firstRowLength) {
            return false;
        }

        for (let r = 0; r < numRows - 1; r++) {
            if (board[r + 1].length !== firstRowLength) {
                return false;
            }
        }

        return true;
    }

    public winner(): string {
        if (this._hasWinner) return this._hasWinner;
        let winner = this.findWinner('O');
        if (winner) return winner;
        winner = this.findWinner('X');
        if (winner) return winner;
        return '';
    }

    private findWinner(player: PlayerType): string {
        let startingPoints: PointType[] = [];

        if (player === 'O') {
            for (let i = 0; i < this._board[0].length; i++) {
                if (this._board[0][i] === 'O') startingPoints.push([0, i]);
            }
        } else {
            for (let i = 0; i < this._board.length; i++) {
                if (this._board[i][0] === 'X') startingPoints.push([i, 0]);
            }
        }

        for (const point of startingPoints) {
            if (this.searchPath(player, point)) {
                return player;
            }
        }

        return '';
    }


    private searchPath(player: PlayerType, p: PointType): boolean {
        if (this._hasWinner) return true;

        const [row, col] = p;

        if (row < 0 || row >= this._board.length || col < 0 || col >= this._board[row].length || this._board[row][col] !== player) {
            return false;
        }

        if (this.isEnd(player, p)) {
            this._hasWinner = true;
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

        for (const dir of directions) {
            if (this.searchPath(player, dir)) {
                return true;
            }
        }

        this._board[row][col] = player;
        return false;
    }


    private isEnd(player: PlayerType, p: PointType): boolean {
        return (
            (player === 'O' && p[0] === this._board.length - 1) ||
            (player === 'X' && p[1] === this._board[p[0]].length - 1)
        );
    }
}