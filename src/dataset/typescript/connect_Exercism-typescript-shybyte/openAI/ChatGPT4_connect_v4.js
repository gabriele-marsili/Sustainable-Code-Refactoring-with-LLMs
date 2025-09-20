"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getNeighbors([row, col]) {
    return [
        [row, col - 1],
        [row, col + 1],
        [row - 1, col],
        [row + 1, col],
        [row + 1, col - 1],
        [row - 1, col + 1],
    ];
}
class Board {
    constructor(boardInput) {
        this.content = boardInput.map((row) => [...row.replace(/ /g, '')]);
    }
    winner() {
        return this.canConnectX() ? 'X' : this.canConnectO() ? 'O' : '';
    }
    canConnectX() {
        const cols = this.content[0].length;
        const isRightBorder = (_, col) => col === cols;
        return this.canConnect('X', this.content.map((_row, rowIndex) => [rowIndex, -1]), isRightBorder);
    }
    canConnectO() {
        const rows = this.content.length;
        const isBottomBorder = (row) => row === rows;
        return this.canConnect('O', this.content[0].map((_cell, colIndex) => [-1, colIndex]), (_, __, row) => isBottomBorder(row));
    }
    canConnect(player, startBorderFields, isFinalBorder) {
        var _a;
        const visited = new Set();
        const fieldStack = [...startBorderFields];
        while (fieldStack.length > 0) {
            const [row, col] = fieldStack.pop();
            const key = `${row},${col}`;
            if (visited.has(key))
                continue;
            visited.add(key);
            for (const [nRow, nCol] of getNeighbors([row, col])) {
                if (isFinalBorder(row, col, nRow))
                    return true;
                if (((_a = this.content[nRow]) === null || _a === void 0 ? void 0 : _a[nCol]) === player &&
                    !visited.has(`${nRow},${nCol}`)) {
                    fieldStack.push([nRow, nCol]);
                }
            }
        }
        return false;
    }
}
exports.default = Board;
