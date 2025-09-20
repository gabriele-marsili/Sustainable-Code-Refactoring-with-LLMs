"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getNeighbors([row, col]) {
    return [
        [row, col - 1],
        [row, col + 1],
        [row - 1, col],
        [row + 1, col],
        [row + 1, col - 1],
        [row - 1, col + 1]
    ];
}
class Board {
    constructor(boardInput) {
        this.content = boardInput.map((row) => [...row.replace(/ /g, '')]);
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
        const isRightBorder = ([_row, col]) => col === this.cols;
        const startBorderFields = [];
        for (let rowIndex = 0; rowIndex < this.rows; rowIndex++) {
            startBorderFields.push([rowIndex, -1]);
        }
        return this.canConnect('X', startBorderFields, isRightBorder);
    }
    canConnectO() {
        const isBottomBorder = ([row, _col]) => row === this.rows;
        const startBorderFields = [];
        for (let colIndex = 0; colIndex < this.cols; colIndex++) {
            startBorderFields.push([-1, colIndex]);
        }
        return this.canConnect('O', startBorderFields, isBottomBorder);
    }
    canConnect(player, startBorderFields, isFinalBorder) {
        const visited = new Set();
        const fieldStack = [...startBorderFields];
        while (fieldStack.length > 0) {
            const field = fieldStack.pop();
            const neighbors = getNeighbors(field);
            for (const neighbor of neighbors) {
                if (isFinalBorder(neighbor)) {
                    return true;
                }
                const [row, col] = neighbor;
                if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
                    const key = `${row},${col}`;
                    if (!visited.has(key) && this.content[row][col] === player) {
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
