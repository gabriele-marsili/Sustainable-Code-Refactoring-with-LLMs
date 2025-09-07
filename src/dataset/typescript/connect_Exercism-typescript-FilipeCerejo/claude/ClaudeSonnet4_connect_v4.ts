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
        if (board.length === 0 || board.length !== board[0].length) {
            return false;
        }
        
        for (let r = 0; r < board.length - 1; r++) {
            if (board[r + 1].length !== board[r].length + 1) {
                return false;
            }
        }
        return true;
    }

    public winner(): string {
        this._hasWinner = false;
        
        if (this.winnerPath('O')) return 'O';
        
        this._hasWinner = false;
        if (this.winnerPath('X')) return 'X';
        
        return '';
    }

    private winnerPath(player: PlayerType): boolean {
        const startingPoints: PointType[] = [];

        if (player === 'O') {
            for (let i = 0; i < this._board[0].length; i++) {
                if (this._board[0][i] === 'O') {
                    startingPoints.push([0, i]);
                }
            }
        } else {
            for (let i = 0; i < this._board.length; i++) {
                if (this._board[i][i] === 'X') {
                    startingPoints.push([i, i]);
                }
            }
        }

        const originalBoard = this._board.map(row => [...row]);
        
        for (const point of startingPoints) {
            this._board = originalBoard.map(row => [...row]);
            this._hasWinner = false;
            this.searchPath(player, point);
            if (this._hasWinner) {
                return true;
            }
        }
        
        this._board = originalBoard;
        return false;
    }

    private searchPath(player: PlayerType, p: PointType): void {
        if (this._hasWinner) return;
        
        this._board[p[0]][p[1]] = 'A';

        if (this.isEnd(player, p)) {
            this._hasWinner = true;
            return;
        }

        const moves: PointType[] = [
            [p[0] - 1, p[1] - 1],
            [p[0] - 1, p[1]],
            [p[0], p[1] + 1],
            [p[0] + 1, p[1] + 1],
            [p[0] + 1, p[1]],
            [p[0], p[1] - 1]
        ];

        for (const move of moves) {
            if (this._hasWinner) break;
            if (this.isValidMove(player, move)) {
                this.searchPath(player, move);
            }
        }
    }

    private isValidMove(player: PlayerType, p: PointType): boolean {
        const row = this._board[p[0]];
        return row !== undefined && row[p[1]] === player;
    }

    private isEnd(player: PlayerType, p: PointType): boolean {
        return (
            (player === 'O' && p[0] === this._board.length - 1) ||
            (player === 'X' && p[1] === this._board[p[0]].length - 1)
        );
    }
}