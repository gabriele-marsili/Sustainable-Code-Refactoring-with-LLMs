type Pos = [number, number];

function getNeighbors([row, col]: Pos, rows: number, cols: number): Pos[] {
    const neighbors: Pos[] = [];

    if (col > 0) {
        neighbors.push([row, col - 1]);
    }
    if (col < cols - 1) {
        neighbors.push([row, col + 1]);
    }
    if (row > 0) {
        neighbors.push([row - 1, col]);
    }
    if (row < rows - 1) {
        neighbors.push([row + 1, col]);
    }
    if (row < rows - 1 && col > 0) {
        neighbors.push([row + 1, col - 1]);
    }
    if (row > 0 && col < cols - 1) {
        neighbors.push([row - 1, col + 1]);
    }

    return neighbors;
}

export default class Board {
    private readonly content: string[][];
    private readonly rows: number;
    private readonly cols: number;

    constructor(boardInput: string[]) {
        this.content = boardInput.map((row) => row.replace(/ /g, '').split(''));
        this.rows = this.content.length;
        this.cols = this.content[0].length;
    }

    winner() {
        if (this.canConnectX()) {
            return 'X';
        } else if (this.canConnectO()) {
            return 'O';
        } else {
            return '';
        }
    }

    canConnectX() {
        const cols = this.cols;
        const isRightBorder = ([_row, col]: Pos) => col === cols;
        const startBorderFields: Pos[] = [];
        for (let rowIndex = 0; rowIndex < this.rows; rowIndex++) {
            startBorderFields.push([rowIndex, -1]);
        }
        return this.canConnect('X', startBorderFields, isRightBorder);
    }

    canConnectO() {
        const rows = this.rows;
        const isBottomBorder = ([row, _col]: Pos) => row === rows;
        const startBorderFields: Pos[] = [];
        for (let colIndex = 0; colIndex < this.cols; colIndex++) {
            startBorderFields.push([-1, colIndex]);
        }
        return this.canConnect('O', startBorderFields, isBottomBorder);
    }

    canConnect(player: string, startBorderFields: Pos[], isFinalBorder: (p: Pos) => boolean) {
        const visited: Set<string> = new Set();
        const fieldStack: Pos[] = [...startBorderFields];
        const rows = this.rows;
        const cols = this.cols;

        while (fieldStack.length > 0) {
            const field = fieldStack.pop()!;
            const neighbors = getNeighbors(field, rows, cols);

            for (const neighbor of neighbors) {
                if (isFinalBorder(neighbor)) {
                    return true;
                }

                const [row, col] = neighbor;
                if (row >= 0 && row < rows && col >= 0 && col < cols && this.content[row][col] === player) {
                    const key = `${row},${col}`;
                    if (!visited.has(key)) {
                        visited.add(key);
                        fieldStack.push(neighbor);
                    }
                }
            }
        }

        return false;
    }
}