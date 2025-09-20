"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getNeighbors([row, col], rows, cols) {
    const neighbors = [];
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
class Board {
    constructor(boardInput) {
        this.content = boardInput.map((row) => row.replace(/ /g, '').split(''));
        this.rows = this.content.length;
        this.cols = this.content[0].length;
    }
    winner() {
        if (this.canConnectX()) {
            return 'X';
        }
        else if (this.canConnectO()) {
            return 'O';
        }
        else {
            return '';
        }
    }
    canConnectX() {
        const isRightBorder = ([_row, col]) => col === this.cols - 1;
        const startPositions = [];
        for (let rowIndex = 0; rowIndex < this.rows; rowIndex++) {
            startPositions.push([rowIndex, 0]);
        }
        return this.canConnect('X', startPositions, isRightBorder);
    }
    canConnectO() {
        const isBottomBorder = ([row, _col]) => row === this.rows - 1;
        const startPositions = [];
        for (let colIndex = 0; colIndex < this.cols; colIndex++) {
            startPositions.push([0, colIndex]);
        }
        return this.canConnect('O', startPositions, isBottomBorder);
    }
    canConnect(player, startBorderFields, isFinalBorder) {
        const visited = Array(this.rows).fill(null).map(() => Array(this.cols).fill(false));
        const fieldStack = [...startBorderFields];
        while (fieldStack.length > 0) {
            const field = fieldStack.pop();
            const [row, col] = field;
            if (row < 0 || row >= this.rows || col < 0 || col >= this.cols || visited[row][col] || this.content[row][col] !== player) {
                continue;
            }
            if (isFinalBorder([row, col])) {
                return true;
            }
            visited[row][col] = true;
            const neighbors = getNeighbors([row, col], this.rows, this.cols);
            for (const neighbor of neighbors) {
                fieldStack.push(neighbor);
            }
        }
        return false;
    }
}
exports.default = Board;
