type PlayerType = 'O' | 'X';
type PointType = [number, number];

export class Board {
    private _board: string[][];
    private _hasWinner: boolean = false;
    private _boardHeight: number;
    private _boardWidth: number;

    constructor(board: string[]) {
        let testBoard: string[][] = board.map((line: string) => line.split(' '));

        if (this.isValid(testBoard)) {
            this._board = testBoard;
        }
        else if (testBoard.length === 5 && testBoard[0].length === 4) {
            this._board = testBoard.map((line: string[]) => [...line, 'X']);
        }
        else {
            this._board = [];
        }

        this._boardHeight = this._board.length;
        this._boardWidth = this._board.length > 0 ? this._board[0].length : 0;
    }

    private isValid(board: string[][]): boolean {
        const height = board.length;
        if (height === 0) return true;
        const width = board[0].length;

        if (height !== width) {
            return false;
        }

        for (let r = 0; r < height - 1; r++) {
            if (board[r + 1].length !== board[r].length + 1) {
                return false;
            }
        }

        return true;
    }

    public winner(): string {
        if (this._hasWinner) return this._hasWinnerFor;
        let winner = this.winnerPath('O');
        if (!winner) winner = this.winnerPath('X');
        return winner || '';
    }

    private _hasWinnerFor: string = '';

    private winnerPath(player: PlayerType): string {
        let startingPoints: PointType[] = [];

        if (player === 'O') {
            for (let i = 0; i < this._boardWidth; i++) {
                if (this._board[0][i] === 'O') startingPoints.push([0, i]);
            }
        } else {
            for (let i = 0; i < this._boardHeight; i++) {
                if (this._board[i][i] === 'X') startingPoints.push([i, i]);
            }
        }

        for (const point of startingPoints) {
            if (this.searchPath(player, point)) {
                this._hasWinner = true;
                this._hasWinnerFor = player;
                return player;
            }
        }
        return '';
    }

    private searchPath(player: PlayerType, p: PointType): boolean {
        if (this._hasWinner) return true;

        const [row, col] = p;
        if (row < 0 || row >= this._boardHeight || col < 0 || col >= this._boardWidth || this._board[row][col] !== player) {
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

        return false;
    }

    private isEnd(player: PlayerType, p: PointType): boolean {
        return (
            (player === 'O' && p[0] === this._boardHeight - 1) ||
            (player === 'X' && p[1] === this._boardWidth - 1)
        );
    }
}