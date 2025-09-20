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
        const cols = this.cols;
        const isRightBorder = ([_row, col]) => col === cols;
        const startBorderFields = [];
        for (let rowIndex = 0; rowIndex < this.rows; rowIndex++) {
            startBorderFields.push([rowIndex, -1]);
        }
        return this.canConnect('X', startBorderFields, isRightBorder);
    }
    canConnectO() {
        const rows = this.rows;
        const isBottomBorder = ([row, _col]) => row === rows;
        const startBorderFields = [];
        for (let colIndex = 0; colIndex < this.cols; colIndex++) {
            startBorderFields.push([-1, colIndex]);
        }
        return this.canConnect('O', startBorderFields, isBottomBorder);
    }
    canConnect(player, startBorderFields, isFinalBorder) {
        const visited = new Set();
        const fieldStack = [...startBorderFields];
        const rows = this.rows;
        const cols = this.cols;
        while (fieldStack.length > 0) {
            const field = fieldStack.pop();
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
exports.default = Board;
