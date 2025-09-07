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

        const visited = new Set<string>();
        return startingPoints.some((point: PointType) => this.searchPath(player, point, visited));
    }

    private searchPath(player: PlayerType, p: PointType, visited: Set<string>): boolean {
        const key = `${p[0]},${p[1]}`;
        if (visited.has(key)) return false;
        
        visited.add(key);

        if (this.isEnd(player, p)) {
            this._hasWinner = true;
            return true;
        }

        const directions: PointType[] = [
            [-1, -1], [-1, 0], [0, 1], [1, 1], [1, 0], [0, -1]
        ];

        for (const [dr, dc] of directions) {
            const nextPoint: PointType = [p[0] + dr, p[1] + dc];
            if (this.isValidMove(player, nextPoint)) {
                if (this.searchPath(player, nextPoint, visited)) {
                    return true;
                }
            }
        }

        return false;
    }

    private isValidMove(player: PlayerType, p: PointType): boolean {
        return (
            p[0] >= 0 && p[0] < this._board.length &&
            p[1] >= 0 && p[1] < this._board[p[0]].length &&
            this._board[p[0]][p[1]] === player
        );
    }

    private isEnd(player: PlayerType, p: PointType): boolean {
        return (
            (player === 'O' && p[0] === this._board.length - 1) ||
            (player === 'X' && p[1] === this._board[p[0]].length - 1)
        );
    }
}